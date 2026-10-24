import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Wallet,
  LayoutDashboard,
  PiggyBank,
  PlusCircle,
  LogIn,
  UserPlus,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Budget",
      path: "/budget",
      icon: PiggyBank,
    },
    {
      name: "Create Budget",
      path: "/createbudget",
      icon: PlusCircle,
    },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: -8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20"
            >
              <Wallet size={23} className="text-white" />
            </motion.div>

            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Budget <span className="text-indigo-400">Calc</span>
              </h1>
              <p className="hidden text-[11px] text-slate-500 sm:block">
                Manage money. Reach goals.
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map(({ name, path, icon: Icon }) => (
              <NavLink key={path} to={path} className={linkClass}>
                <Icon size={17} />
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop authentication links */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/signin"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <LogIn size={17} />
              Sign in
            </Link>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:from-indigo-400 hover:to-violet-500"
              >
                <UserPlus size={17} />
                Get started
                <ChevronRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden lg:hidden"
            >
              <nav
                aria-label="Mobile navigation"
                className="space-y-2 border-t border-white/10 py-4"
              >
                {navLinks.map(({ name, path, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={closeMenu}
                    className={linkClass}
                  >
                    <Icon size={18} />
                    <span>{name}</span>
                  </NavLink>
                ))}

                <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 md:hidden">
                  <Link
                    to="/signin"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <LogIn size={17} />
                    Sign in
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-3 py-3 text-sm font-semibold text-white transition hover:from-indigo-400 hover:to-violet-500"
                  >
                    <UserPlus size={17} />
                    Sign up
                  </Link>
                </div>

                {/* On medium screens, show auth links in the mobile menu
                    because the desktop auth section starts at md. */}
                <div className="hidden grid-cols-2 gap-3 border-t border-white/10 pt-4 md:grid lg:hidden">
                  <Link
                    to="/signin"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-3 text-sm font-medium text-slate-300"
                  >
                    <LogIn size={17} />
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-3 py-3 text-sm font-semibold text-white"
                  >
                    <UserPlus size={17} />
                    Sign up
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
