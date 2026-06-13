const https = require('https');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { amount, cart_id, cart_description, customer_details } = JSON.parse(event.body);
    
    const PAYTABS_PROFILE_ID = process.env.PAYTABS_PROFILE_ID;
    const PAYTABS_SERVER_KEY = process.env.PAYTABS_SERVER_KEY;

    if (!PAYTABS_PROFILE_ID || !PAYTABS_SERVER_KEY) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'PayTabs not configured' }) };
    }

    const paymentData = {
      profile_id: PAYTABS_PROFILE_ID,
      tran_type: 'sale',
      tran_class: 'ecom',
      cart_id: cart_id || `order-${Date.now()}`,
      cart_description: cart_description || 'Pioneers International Service',
      cart_currency: 'USD',
      cart_amount: amount || 100,
      callback: 'https://pioneersint.com/.netlify/functions/payment-callback',
      return: customer_details?.return_url || 'https://pioneersint.com/payment-success',
      customer_details: {
        name: customer_details?.name || 'Customer',
        email: customer_details?.email || 'customer@example.com',
        phone: customer_details?.phone || '00962781595846',
        street1: customer_details?.address || 'Amman, Jordan',
        city: 'Amman',
        state: 'Amman',
        country: 'JO',
        zip: '11118'
      }
    };

    // Call PayTabs API
    const result = await new Promise((resolve, reject) => {
      const postData = JSON.stringify(paymentData);
      const options = {
        hostname: 'secure-egypt.paytabs.com',
        port: 443,
        path: '/payment/request',
        method: 'POST',
        headers: {
          'authorization': PAYTABS_SERVER_KEY,
          'content-type': 'application/json',
          'content-length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try { resolve(JSON.parse(data)); } 
          catch (e) { resolve({ error: data }); }
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });

    if (result.redirect_url) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          redirect_url: result.redirect_url,
          tran_ref: result.tranRef
        })
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: result.message || 'Payment failed',
          details: result
        })
      };
    }
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
