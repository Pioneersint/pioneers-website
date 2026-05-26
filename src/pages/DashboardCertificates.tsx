import { motion } from 'framer-motion';
import { Download, CheckCircle, Calendar } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const myCertificates = [
  { id: '1', title: 'ISO 9001:2015 Quality Management', type: 'ISO 9001', issued: 'Jan 15, 2025', expires: 'Jan 14, 2028', status: 'Active', thumbnail: '/assets/images/certificate-sample.jpg' },
  { id: '2', title: 'ESG Strategy Professional', type: 'ESG', issued: 'Mar 10, 2025', expires: 'Mar 9, 2028', status: 'Active', thumbnail: '/assets/images/certificate-sample.jpg' },
  { id: '3', title: 'Corporate Governance Specialist', type: 'Governance', issued: 'Feb 1, 2025', expires: 'Jan 31, 2028', status: 'Active', thumbnail: '/assets/images/certificate-sample.jpg' },
];

export default function DashboardCertificates() {
  return (
    <DashboardLayout>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {myCertificates.map((cert, i) => (
          <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img src={cert.thumbnail} alt={cert.title} className="w-full h-40 object-cover" />
              <span className="absolute top-3 right-3 bg-emerald text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />{cert.status}
              </span>
            </div>
            <div className="p-4">
              <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{cert.type}</span>
              <h5 className="font-semibold text-slate-800 mt-2 mb-3">{cert.title}</h5>
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Issued: {cert.issued}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>Expires: {cert.expires}</span>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
