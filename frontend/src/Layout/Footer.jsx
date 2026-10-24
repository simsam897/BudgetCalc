import { motion } from "motion/react";
import { Wallet, Heart, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="border-t border-white/10 bg-slate-950 text-slate-400"
    >
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          {/* Brand */}
          <Link to="/dashboard" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
              <Wallet size={20} />
            </div>

            <div>
              <p className="font-bold text-white">
                Budget <span className="text-indigo-400">Calc</span>
              </p>
              <p className="text-xs text-slate-500">Your money, your goals.</p>
            </div>
          </Link>

          {/* Copyright */}
          <p className="text-center text-xs leading-6 sm:text-sm">
            © {year} Budget Calc. All rights reserved.
          </p>

          {/* Back to top */}
          <motion.button
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-300"
          >
            Back to top
            <ArrowUp size={16} />
          </motion.button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-white/10 pt-5 text-xs text-slate-500">
          Made with <Heart size={13} className="fill-rose-400 text-rose-400" />{" "}
          for better budgeting
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
