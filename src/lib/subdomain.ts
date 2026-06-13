/**
 * Detects which subdomain is being accessed
 * Returns null for main domain (pioneersint.com, www.pioneersint.com)
 * Returns subdomain name for subdomains (njpi-macs, consulting, hccs)
 */
export function detectSubdomain(): string | null {
  const hostname = window.location.hostname;
  
  // Local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const urlParams = new URLSearchParams(window.location.search);
    const devSubdomain = urlParams.get('subdomain');
    return devSubdomain;
  }
  
  // Production
  const parts = hostname.split('.');
  
  // pioneersint.com or www.pioneersint.com → main site
  if (parts.length < 3 || parts[0] === 'www') {
    return null;
  }
  
  // njpi-macs.pioneersint.com → njpi-macs
  return parts[0];
}

export type SubdomainType = 'njpi-macs' | 'consulting' | 'hccs' | null;

export function getSubdomainType(): SubdomainType {
  const subdomain = detectSubdomain();
  if (subdomain === 'njpi-macs') return 'njpi-macs';
  if (subdomain === 'consulting') return 'consulting';
  if (subdomain === 'hccs') return 'hccs';
  return null;
}
