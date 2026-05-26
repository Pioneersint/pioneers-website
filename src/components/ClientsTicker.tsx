import { motion } from 'framer-motion';

interface ClientLogo {
  name: string;
  src: string;
}

const clients: ClientLogo[] = [
  { name: 'Absher', src: '/assets/images/clients/absher.jpg' },
  { name: 'CITI', src: '/assets/images/clients/citi.jpg' },
  { name: 'Creative Planning', src: '/assets/images/clients/creative-planning.jpg' },
  { name: 'Halfeeya', src: '/assets/images/clients/halfeeya.png' },
  { name: 'Elysium', src: '/assets/images/clients/elysium.png' },
  { name: 'OR Logistic', src: '/assets/images/clients/logistics.png' },
  { name: 'MASA', src: '/assets/images/clients/masa.png' },
  { name: 'Jazeerat Alyaqout', src: '/assets/images/clients/jazeerat-alyaqout.jpg' },
  { name: 'Tech Process Solution', src: '/assets/images/clients/tech-process.jpg' },
  { name: 'Union Trade', src: '/assets/images/clients/union-trade.jpg' },
  { name: 'Royah Cooperative', src: '/assets/images/clients/royah-cooperative.jpg' },
  { name: 'Lenover', src: '/assets/images/clients/lenover.png' },
  { name: 'Qasr Al Hadla', src: '/assets/images/clients/qasr-alhadla.png' },
  { name: 'Rodayat Al Akhyar', src: '/assets/images/clients/safeer.jpg' },
  { name: 'Tatawor', src: '/assets/images/clients/tatawor.jpg' },
  { name: 'Saudi Projects', src: '/assets/images/clients/saudi.jpg' },
  { name: 'MCS', src: '/assets/images/clients/mcs.jpg' },
  { name: 'Yesra', src: '/assets/images/clients/yesra.jpg' },
  { name: 'Aman', src: '/assets/images/clients/aman.jpg' },
  { name: 'ISO Education School', src: '/assets/images/clients/sarah.jpg' },
  { name: 'Tawazun', src: '/assets/images/clients/tawazun.jpg' },
  { name: 'Boutiqaat', src: '/assets/images/clients/boutiqaat.jpg' },
  { name: 'Sareyah', src: '/assets/images/clients/sareyah-1.jpg' },
  { name: 'Sareyah Group', src: '/assets/images/clients/sareyah-2.jpg' },
];

// Duplicate for seamless loop
const allClients = [...clients, ...clients];

export default function ClientsTicker() {
  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="content-container mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-emerald">
            Trusted Partners
          </span>
          <h2 className="text-h3 text-navy mt-2">
            Organizations We Serve
          </h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto">
            Proudly supporting leading organizations across Jordan, Saudi Arabia, and the MENA region
          </p>
        </motion.div>
      </div>

      {/* Ticker Row 1 - Left */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: [0, -50 * clients.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 50,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-12"
        >
          {allClients.map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="w-24 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Ticker Row 2 - Right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: [-50 * clients.length, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 50,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-12"
        >
          {[...allClients].reverse().map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="w-24 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="content-container mt-12"
      >
        <div className="flex items-center justify-center gap-8 md:gap-16">
          {[
            { value: '26+', label: 'Client Organizations' },
            { value: '8', label: 'Countries' },
            { value: '98%', label: 'Client Retention' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-navy">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
