import { LucideVerified, School, Share, User } from "lucide-react";
import footer from "../data/footer.json";

const Footer = () => {
  return (
    <footer className="bg-academic-charcoal text-white pt-24 pb-12 px-6 lg:px-20 border-t-8 border-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="size-12 rounded-xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-3xl">
                  <img src="/logo.png" alt="Logo" className="w-full h-full" />
                </span>
              </div>
              <h3 className="text-2xl font-900 tracking-tight">
                SECUNDARIA GENERAL NO. 10
              </h3>
            </div>
            <p className="text-slate-400 text-lg max-w-md mb-8">
              Formando con excelencia académica y valores desde el corazón de la
              Comarca Lagunera. Un legado de educación pública de calidad en
              Torreón, Coahuila.
            </p>
            <div className="flex gap-4">
              <a
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all"
                href="#"
              >
                <User />
              </a>
              <a
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all"
                href="#"
              >
                <Share />
              </a>
              <a
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all"
                href="#"
              >
                <LucideVerified />
              </a>
            </div>
          </div>

          {footer.data.map((item, index) => (
            <div key={index}>
              <h4 className="font-black text-primary text-xs uppercase tracking-[0.3em] mb-8">
                {item.title}
              </h4>
              <ul className="space-y-4">
                {item.content.map((content, index) => (
                  <li key={index}>
                    <a
                      className="text-slate-400 hover:text-white transition-colors font-medium"
                      href={content.split(" ").join("-").toLowerCase()}
                    >
                      {content}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>
            © 2024 Escuela Secundaria General No. 10 Netzahualcóyotl. Torreón,
            Coahuila.
          </p>
          <p className="font-bold text-slate-400 tracking-widest uppercase text-[10px]">
            C.C.T. 05ECB0010T
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
