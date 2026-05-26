import { ChevronDown, Globe } from 'lucide-react';
import { COUNTRIES } from '@/lib/validation';

interface CountryDropdownProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function CountryDropdown({ value, onChange, error, required = false, className = '' }: CountryDropdownProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Country {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-11 pl-10 pr-10 bg-slate-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/30 appearance-none cursor-pointer transition-all ${
            error ? 'border-red-300 bg-red-50' : 'border-slate-200'
          }`}
        >
          <option value="">-- Select Country --</option>
          {/* MENA Region */}
          <optgroup label="Middle East & North Africa">
            {COUNTRIES.filter(c => ['AE','SA','JO','EG','QA','KW','BH','OM','IQ','LB','SY','PS','YE','SD','LY','MA','TN','DZ','TR','IR'].includes(c.code)).map(c => (
              <option key={c.code} value={c.code}>
                {c.name} {c.phoneCode && `(${c.phoneCode})`}
              </option>
            ))}
          </optgroup>
          {/* Europe */}
          <optgroup label="Europe">
            {COUNTRIES.filter(c => ['GB','DE','FR','IT','ES','NL','SE','NO','CH','AT','BE','DK','FI','IE','PT','GR','PL','CZ','HU','RO','BG','HR','RS','SI','SK','LT','LV','EE','IS','MT','CY','LU','MC','LI','SM','AD','VA','UA','BY','MD','AL','BA','MK','ME','XK','RU'].includes(c.code)).map(c => (
              <option key={c.code} value={c.code}>
                {c.name} {c.phoneCode && `(${c.phoneCode})`}
              </option>
            ))}
          </optgroup>
          {/* Americas */}
          <optgroup label="Americas">
            {COUNTRIES.filter(c => ['US','CA','BR','MX','AR'].includes(c.code)).map(c => (
              <option key={c.code} value={c.code}>
                {c.name} {c.phoneCode && `(${c.phoneCode})`}
              </option>
            ))}
          </optgroup>
          {/* Asia Pacific */}
          <optgroup label="Asia Pacific">
            {COUNTRIES.filter(c => ['SG','TH','VN','KH','LA','MM','NP','LK','MY','ID','PH','IN','PK','BD','CN','JP','KR','AU','NZ','AF','UZ','KZ','KG','TJ','TM','AZ','AM','GE'].includes(c.code)).map(c => (
              <option key={c.code} value={c.code}>
                {c.name} {c.phoneCode && `(${c.phoneCode})`}
              </option>
            ))}
          </optgroup>
          {/* Africa */}
          <optgroup label="Africa">
            {COUNTRIES.filter(c => ['NG','ZA','KE','GH'].includes(c.code)).map(c => (
              <option key={c.code} value={c.code}>
                {c.name} {c.phoneCode && `(${c.phoneCode})`}
              </option>
            ))}
          </optgroup>
          <option value="Other">Other</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
