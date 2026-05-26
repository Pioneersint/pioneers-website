// ==========================================
// Pioneers International - Form Validation
// ==========================================

/* ── Email ── */
export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}

export function getEmailError(email: string): string {
  if (!email.trim()) return 'Email is required';
  if (!isValidEmail(email)) return 'Invalid email format (e.g. user@domain.com)';
  return '';
}

/* ── Phone ── */
export function isValidPhone(phone: string): boolean {
  const clean = phone.trim();
  if (!clean) return false;
  // Check if it starts with + and has enough digits
  if (/^\+/.test(clean)) {
    const digits = clean.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }
  // Allow local numbers with country code context
  const digits = clean.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function getPhoneError(phone: string): string {
  if (!phone.trim()) return 'Phone number is required';
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) return 'Phone number too short (min 7 digits)';
  if (digits.length > 15) return 'Phone number too long (max 15 digits)';
  return '';
}

/* ── Password ── */
export function isValidPassword(password: string): boolean {
  if (password.length < 6) return false;
  return true;
}

export function getPasswordError(password: string): string {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (password.length > 128) return 'Password too long';
  return '';
}

export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (score <= 1) return 'weak';
  if (score <= 2) return 'medium';
  return 'strong';
}

/* ── Name ── */
export function getNameError(name: string): string {
  if (!name.trim()) return 'Full name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) return 'Name can only contain letters, spaces, hyphens and apostrophes';
  return '';
}

/* ── Country ── */
export const COUNTRIES = [
  { code: 'AE', name: 'United Arab Emirates', phoneCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', phoneCode: '+966' },
  { code: 'JO', name: 'Jordan', phoneCode: '+962' },
  { code: 'EG', name: 'Egypt', phoneCode: '+20' },
  { code: 'QA', name: 'Qatar', phoneCode: '+974' },
  { code: 'KW', name: 'Kuwait', phoneCode: '+965' },
  { code: 'BH', name: 'Bahrain', phoneCode: '+973' },
  { code: 'OM', name: 'Oman', phoneCode: '+968' },
  { code: 'IQ', name: 'Iraq', phoneCode: '+964' },
  { code: 'LB', name: 'Lebanon', phoneCode: '+961' },
  { code: 'SY', name: 'Syria', phoneCode: '+963' },
  { code: 'PS', name: 'Palestine', phoneCode: '+970' },
  { code: 'YE', name: 'Yemen', phoneCode: '+967' },
  { code: 'SD', name: 'Sudan', phoneCode: '+249' },
  { code: 'LY', name: 'Libya', phoneCode: '+218' },
  { code: 'MA', name: 'Morocco', phoneCode: '+212' },
  { code: 'TN', name: 'Tunisia', phoneCode: '+216' },
  { code: 'DZ', name: 'Algeria', phoneCode: '+213' },
  { code: 'US', name: 'United States', phoneCode: '+1' },
  { code: 'GB', name: 'United Kingdom', phoneCode: '+44' },
  { code: 'CA', name: 'Canada', phoneCode: '+1' },
  { code: 'AU', name: 'Australia', phoneCode: '+61' },
  { code: 'DE', name: 'Germany', phoneCode: '+49' },
  { code: 'FR', name: 'France', phoneCode: '+33' },
  { code: 'IT', name: 'Italy', phoneCode: '+39' },
  { code: 'ES', name: 'Spain', phoneCode: '+34' },
  { code: 'NL', name: 'Netherlands', phoneCode: '+31' },
  { code: 'TR', name: 'Turkey', phoneCode: '+90' },
  { code: 'IN', name: 'India', phoneCode: '+91' },
  { code: 'PK', name: 'Pakistan', phoneCode: '+92' },
  { code: 'BD', name: 'Bangladesh', phoneCode: '+880' },
  { code: 'ID', name: 'Indonesia', phoneCode: '+62' },
  { code: 'MY', name: 'Malaysia', phoneCode: '+60' },
  { code: 'PH', name: 'Philippines', phoneCode: '+63' },
  { code: 'NG', name: 'Nigeria', phoneCode: '+234' },
  { code: 'ZA', name: 'South Africa', phoneCode: '+27' },
  { code: 'KE', name: 'Kenya', phoneCode: '+254' },
  { code: 'GH', name: 'Ghana', phoneCode: '+233' },
  { code: 'CN', name: 'China', phoneCode: '+86' },
  { code: 'JP', name: 'Japan', phoneCode: '+81' },
  { code: 'KR', name: 'South Korea', phoneCode: '+82' },
  { code: 'BR', name: 'Brazil', phoneCode: '+55' },
  { code: 'MX', name: 'Mexico', phoneCode: '+52' },
  { code: 'AR', name: 'Argentina', phoneCode: '+54' },
  { code: 'RU', name: 'Russia', phoneCode: '+7' },
  { code: 'SE', name: 'Sweden', phoneCode: '+46' },
  { code: 'NO', name: 'Norway', phoneCode: '+47' },
  { code: 'CH', name: 'Switzerland', phoneCode: '+41' },
  { code: 'AT', name: 'Austria', phoneCode: '+43' },
  { code: 'BE', name: 'Belgium', phoneCode: '+32' },
  { code: 'DK', name: 'Denmark', phoneCode: '+45' },
  { code: 'FI', name: 'Finland', phoneCode: '+358' },
  { code: 'IE', name: 'Ireland', phoneCode: '+353' },
  { code: 'PT', name: 'Portugal', phoneCode: '+351' },
  { code: 'GR', name: 'Greece', phoneCode: '+30' },
  { code: 'PL', name: 'Poland', phoneCode: '+48' },
  { code: 'CZ', name: 'Czech Republic', phoneCode: '+420' },
  { code: 'HU', name: 'Hungary', phoneCode: '+36' },
  { code: 'RO', name: 'Romania', phoneCode: '+40' },
  { code: 'BG', name: 'Bulgaria', phoneCode: '+359' },
  { code: 'HR', name: 'Croatia', phoneCode: '+385' },
  { code: 'RS', name: 'Serbia', phoneCode: '+381' },
  { code: 'SI', name: 'Slovenia', phoneCode: '+386' },
  { code: 'SK', name: 'Slovakia', phoneCode: '+421' },
  { code: 'LT', name: 'Lithuania', phoneCode: '+370' },
  { code: 'LV', name: 'Latvia', phoneCode: '+371' },
  { code: 'EE', name: 'Estonia', phoneCode: '+372' },
  { code: 'IS', name: 'Iceland', phoneCode: '+354' },
  { code: 'MT', name: 'Malta', phoneCode: '+356' },
  { code: 'CY', name: 'Cyprus', phoneCode: '+357' },
  { code: 'LU', name: 'Luxembourg', phoneCode: '+352' },
  { code: 'MC', name: 'Monaco', phoneCode: '+377' },
  { code: 'LI', name: 'Liechtenstein', phoneCode: '+423' },
  { code: 'SM', name: 'San Marino', phoneCode: '+378' },
  { code: 'AD', name: 'Andorra', phoneCode: '+376' },
  { code: 'VA', name: 'Vatican City', phoneCode: '+379' },
  { code: 'SG', name: 'Singapore', phoneCode: '+65' },
  { code: 'TH', name: 'Thailand', phoneCode: '+66' },
  { code: 'VN', name: 'Vietnam', phoneCode: '+84' },
  { code: 'KH', name: 'Cambodia', phoneCode: '+855' },
  { code: 'LA', name: 'Laos', phoneCode: '+856' },
  { code: 'MM', name: 'Myanmar', phoneCode: '+95' },
  { code: 'NP', name: 'Nepal', phoneCode: '+977' },
  { code: 'LK', name: 'Sri Lanka', phoneCode: '+94' },
  { code: 'AF', name: 'Afghanistan', phoneCode: '+93' },
  { code: 'IR', name: 'Iran', phoneCode: '+98' },
  { code: 'UZ', name: 'Uzbekistan', phoneCode: '+998' },
  { code: 'KZ', name: 'Kazakhstan', phoneCode: '+7' },
  { code: 'KG', name: 'Kyrgyzstan', phoneCode: '+996' },
  { code: 'TJ', name: 'Tajikistan', phoneCode: '+992' },
  { code: 'TM', name: 'Turkmenistan', phoneCode: '+993' },
  { code: 'AZ', name: 'Azerbaijan', phoneCode: '+994' },
  { code: 'AM', name: 'Armenia', phoneCode: '+374' },
  { code: 'GE', name: 'Georgia', phoneCode: '+995' },
  { code: 'MD', name: 'Moldova', phoneCode: '+373' },
  { code: 'UA', name: 'Ukraine', phoneCode: '+380' },
  { code: 'BY', name: 'Belarus', phoneCode: '+375' },
  { code: 'AL', name: 'Albania', phoneCode: '+355' },
  { code: 'BA', name: 'Bosnia and Herzegovina', phoneCode: '+387' },
  { code: 'MK', name: 'North Macedonia', phoneCode: '+389' },
  { code: 'ME', name: 'Montenegro', phoneCode: '+382' },
  { code: 'XK', name: 'Kosovo', phoneCode: '+383' },
  { code: 'Other', name: 'Other', phoneCode: '' },
];

export function getCountryByCode(code: string) {
  return COUNTRIES.find(c => c.code === code) || null;
}

export function getCountryByName(name: string) {
  return COUNTRIES.find(c => c.name === name) || null;
}

/* ── General ── */
export function getRequiredError(value: string, fieldName: string): string {
  if (!value.trim()) return `${fieldName} is required`;
  return '';
}
