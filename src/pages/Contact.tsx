import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Send, CheckCircle, ChevronDown, AlertCircle } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { getEmailError, getPhoneError } from '@/lib/validation';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => {
      const next = { ...prev };
      switch (field) {
        case 'name':
          next.name = !value.trim() ? 'Name is required' : value.trim().length < 2 ? 'Name must be at least 2 characters' : undefined;
          break;
        case 'email':
          next.email = getEmailError(value) || undefined;
          break;
        case 'phone':
          if (value.trim()) next.phone = getPhoneError(value) || undefined;
          else delete next.phone;
          break;
        case 'message':
          next.message = !value.trim() ? 'Message is required' : value.trim().length < 10 ? 'Message must be at least 10 characters' : undefined;
          break;
      }
      if (!next[field as keyof FormErrors]) delete next[field as keyof FormErrors];
      return next;
    });
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    newErrors.email = getEmailError(formData.email) || undefined;

    if (formData.phone.trim()) {
      newErrors.phone = getPhoneError(formData.phone) || undefined;
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    (Object.keys(newErrors) as Array<keyof FormErrors>).forEach(k => {
      if (!newErrors[k]) delete newErrors[k];
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, message: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    // Send email
    const subject = encodeURIComponent('Contact Form: ' + (formData.service || 'General Inquiry'));
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nCompany: ${formData.company || 'N/A'}\nService: ${formData.service || 'General'}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:info@pioneersint.com?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      setTouched({});
      setErrors({});
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const contactInfo = [
    { icon: MapPin, label: t('contact.info.address') },
    { icon: Phone, label: t('contact.info.phone'), href: 'tel:+962781595846' },
    { icon: Mail, label: t('contact.info.email'), href: 'mailto:info@pioneersint.com' },
  ];

  const services = ['ISO Certification', 'ESG Advisory', 'Corporate Governance', 'Training & LMS', 'Digital Transformation', 'Growth Strategy', 'General Inquiry'];

  const inputErrorClass = (field: string) =>
    errors[field as keyof FormErrors] && touched[field]
      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
      : 'border-slate-200 focus:border-emerald focus:ring-emerald/10';

  return (
    <div>
      <section className="relative min-h-[50vh] flex items-center justify-center gradient-navy">
        <div className="content-container text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-display text-white">{t('contact.heroTitle')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-body-lg text-slate-300 mt-4 max-w-2xl mx-auto">{t('contact.heroDesc')}</motion.p>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="content-container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="CONTACT" heading={t('contact.info.heading')} />
              <div className="mt-8 space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-light flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-emerald" />
                    </div>
                    <div>
                      {item.href ? (
                        <a href={item.href} className="text-body text-slate-700 hover:text-emerald transition-colors">{item.label}</a>
                      ) : (
                        <p className="text-body text-slate-700">{item.label}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-video flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <MapPin className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm">Amman, Jordan</p>
                  <p className="text-xs mt-1">Wadi Saqra, Kalbouneh Complex</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="bg-offwhite rounded-2xl p-8 md:p-10 border border-slate-100">
                  <h3 className="text-h3 text-slate-800 mb-6">{t('contact.form.heading')}</h3>

                  {isSubmitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                      <CheckCircle className="w-16 h-16 text-emerald mx-auto mb-4" />
                      <h4 className="text-h4 text-slate-800 mb-2">{t('contact.form.success')}</h4>
                      <p className="text-sm text-slate-500 mt-2">We will get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">{t('contact.form.name')} <span className="text-red-500">*</span></label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={e => validateField('name', e.target.value)}
                            className={`w-full h-12 px-4 bg-white border rounded-lg text-slate-800 placeholder:text-slate-300 outline-none transition-all ${inputErrorClass('name')}`}
                            placeholder="Your full name" />
                          {errors.name && touched.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Email <span className="text-red-500">*</span></label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={e => validateField('email', e.target.value)}
                            className={`w-full h-12 px-4 bg-white border rounded-lg text-slate-800 placeholder:text-slate-300 outline-none transition-all ${inputErrorClass('email')}`}
                            placeholder="your@email.com" />
                          {errors.email && touched.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} onBlur={e => validateField('phone', e.target.value)}
                            className={`w-full h-12 px-4 bg-white border rounded-lg text-slate-800 placeholder:text-slate-300 outline-none transition-all ${inputErrorClass('phone')}`}
                            placeholder="+962 7X XXX XXXX" />
                          {errors.phone && touched.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Service</label>
                          <div className="relative">
                            <select name="service" value={formData.service} onChange={handleChange}
                              className="w-full h-12 px-4 pr-10 bg-white border border-slate-200 rounded-lg text-slate-800 focus:border-emerald focus:ring-2 focus:ring-emerald/10 outline-none transition-all appearance-none cursor-pointer">
                              <option value="">Select a service</option>
                              {services.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Message <span className="text-red-500">*</span></label>
                        <textarea name="message" value={formData.message} onChange={handleChange} onBlur={e => validateField('message', e.target.value)}
                          required rows={5}
                          className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-800 placeholder:text-slate-300 outline-none transition-all resize-none ${inputErrorClass('message')}`}
                          placeholder="Tell us about your project or inquiry..." />
                        {errors.message && touched.message && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                      </div>
                      <button type="submit" className="w-full h-14 bg-emerald text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:bg-emerald-dark transition-colors">
                        <Send className="w-5 h-5" />{t('contact.form.submit')}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
