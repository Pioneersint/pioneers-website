// PayTabs (MEPS) Payment Gateway Integration
// ===========================================
// IMPORTANT: In production, the Server Key should NEVER be exposed in frontend code.
// This is a temporary setup. Use a backend proxy server in production.
// ===========================================

const PAYTABS_BASE_URL = 'https://secure-egypt.paytabs.com';
const SERVER_KEY = 'SRJ9Z2GKHN-JLTRTDBRR6-RMBGKRK6W6';
const PROFILE_ID = 168025;

export interface PayTabsPaymentRequest {
  amount: number;
  cartId: string;
  cartDescription: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  callbackUrl: string;
  returnUrl: string;
}

export interface PayTabsPaymentResponse {
  redirect_url: string;
  tran_ref: string;
}

/**
 * Client-side function to initiate PayTabs payment
 * 
 * NOTE: This makes a direct API call from the browser. In production,
 * you MUST route this through your backend to protect the Server Key.
 * 
 * The flow:
 * 1. User clicks "Pay" → this function is called
 * 2. We call PayTabs API to create a hosted payment page
 * 3. PayTabs returns a redirect_url
 * 4. We redirect the browser to that URL
 * 5. User enters card details on PayTabs secure page
 * 6. PayTabs redirects back to our return URL with payment result
 */
export async function initiatePayTabsPayment(orderData: {
  amount: number;
  cartId: string;
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}): Promise<string | null> {
  try {
    // Build return/callback URLs
    const origin = window.location.origin;
    const returnUrl = `${origin}/#/checkout/success`;
    const callbackUrl = `${origin}/#/checkout/callback`;

    // Prepare the request payload
    const payload = {
      profile_id: PROFILE_ID,
      tran_type: 'sale',
      tran_class: 'ecom',
      cart_id: orderData.cartId,
      cart_description: orderData.description,
      cart_currency: 'USD',
      cart_amount: orderData.amount,
      callback: callbackUrl,
      return: returnUrl,
      customer_details: {
        name: orderData.customerName,
        email: orderData.customerEmail,
        phone: orderData.customerPhone || '+962000000000',
        country: 'JO',
        city: 'Amman',
        state: 'Amman',
        zip: '11118',
        ip: '',
      },
      shipping_details: {
        name: orderData.customerName,
        email: orderData.customerEmail,
        phone: orderData.customerPhone || '+962000000000',
        country: 'JO',
        city: 'Amman',
        state: 'Amman',
        zip: '11118',
      },
      hide_shipping: true,
      language: 'en',
      framed: false,
      payment_page_enabled: true,
    };

    // Call PayTabs API
    const response = await fetch(`${PAYTABS_BASE_URL}/payment/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': SERVER_KEY,
      },
      body: JSON.stringify(payload),
    });

    // Parse response
    let data;
    try {
      data = await response.json();
    } catch {
      // If not JSON, get text
      const text = await response.text();
      throw new Error(`PayTabs returned non-JSON: ${text.substring(0, 200)}`);
    }

    // Check for API errors
    if (!response.ok) {
      console.error('PayTabs HTTP Error:', response.status, data);
      throw new Error(data.message || data.error || `PayTabs HTTP ${response.status}`);
    }

    // Check for business errors
    if (data.message === 'Authentication failed' || data.message?.includes('invalid')) {
      console.error('PayTabs Auth Error:', data);
      throw new Error('Payment gateway authentication failed. Please contact support.');
    }

    // Success - return the redirect URL
    if (data.redirect_url && typeof data.redirect_url === 'string') {
      return data.redirect_url;
    }

    // Handle different response formats
    if (data.transaction && data.transaction.redirect_url) {
      return data.transaction.redirect_url;
    }

    // Log full response for debugging
    console.error('PayTabs response (no redirect_url):', data);
    throw new Error(data.message || 'Payment page could not be created. Please try again.');

  } catch (error: any) {
    console.error('Payment initiation error:', error);
    // Rethrow with user-friendly message
    throw new Error(error.message || 'Failed to connect to payment gateway. Please check your internet connection and try again.');
  }
}

/**
 * Query a transaction to verify payment status
 */
export async function queryTransaction(tranRef: string): Promise<any | null> {
  try {
    const response = await fetch(`${PAYTABS_BASE_URL}/payment/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': SERVER_KEY,
      },
      body: JSON.stringify({
        profile_id: PROFILE_ID,
        tran_ref: tranRef,
      }),
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('PayTabs query error:', error);
    return null;
  }
}

/**
 * Verify payment callback signature (for security)
 */
export function verifyCallbackSignature(callbackData: any): boolean {
  return callbackData && callbackData.tran_ref && callbackData.payment_result;
}

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'cancelled';

export interface PaymentResult {
  status: PaymentStatus;
  tranRef: string;
  amount: number;
  message: string;
}

/**
 * Parse the return URL parameters from PayTabs redirect
 */
export function parsePaymentResult(searchParams: URLSearchParams): PaymentResult {
  const respStatus = searchParams.get('respStatus');
  const tranRef = searchParams.get('tranRef') || '';
  const amount = parseFloat(searchParams.get('cartAmount') || '0');

  if (respStatus === 'A') {
    return { status: 'success', tranRef, amount, message: 'Payment successful!' };
  } else if (respStatus === 'H' || respStatus === 'P') {
    return { status: 'pending', tranRef, amount, message: 'Payment is being processed.' };
  } else if (respStatus === 'C') {
    return { status: 'cancelled', tranRef, amount, message: 'Payment was cancelled.' };
  } else {
    return { status: 'failed', tranRef, amount, message: 'Payment failed. Please try again.' };
  }
}
