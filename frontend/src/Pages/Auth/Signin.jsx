import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Lottie } from "lottie-react";
import signinAnimation from "../../assets/signin-animation.json";

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../../Context/AuthContext";

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signin, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signin(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Unable to sign in. Please try again.",
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-10 lg:py-10">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      {/* Main layout */}
      <div className="relative mx-auto grid max-w-6xl items-stretch gap-8 lg:min-h-[680px] lg:grid-cols-2 lg:gap-10">
        {/* LEFT: Sign-in form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex w-full max-w-md flex-col justify-center lg:mx-0 lg:h-full lg:max-w-none"
        >
          {/* Heading */}
          <div className="mb-7 text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-300">
              <Sparkles size={16} />
              Welcome back
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sign in to your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Pick up where you left off. We're glad to have you back.
            </p>
          </div>

          {/* Sign-in form */}
          <fieldset className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-5 pb-6 pt-2 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-7">
            <legend className="mx-auto px-3 text-sm font-semibold text-indigo-300 lg:mx-0">
              Sign in
            </legend>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 transition duration-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10">
                  <Mail
                    size={19}
                    className="shrink-0 text-slate-500 transition group-focus-within:text-indigo-400"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 transition duration-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10">
                  <LockKeyhole
                    size={19}
                    className="shrink-0 text-slate-500 transition group-focus-within:text-indigo-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="shrink-0 text-slate-500 transition hover:text-white"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Backend error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    key="signin-error"
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.25 }}
                    role="alert"
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-sm text-rose-300">
                      <span className="font-bold">!</span>
                      <p>{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:from-indigo-400 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              {/* Security note */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={15} className="text-emerald-400" />
                Your information is handled securely.
              </div>
            </form>
          </fieldset>

          {/* Signup link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Create account
            </Link>
          </p>
        </motion.div>

        {/* RIGHT: Welcome panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="hidden lg:flex lg:h-full"
        >
          <div className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-slate-900/80 to-violet-500/10 p-5 xl:p-6">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative flex flex-col justify-center">
              {/* Compact Lottie animation */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-auto mb-2 flex h-40 w-full max-w-[220px] items-center justify-center"
              >
                <Lottie
                  src={signinAnimation}
                  loop
                  autoplay
                  className="h-full w-full"
                />
              </motion.div>

              {/* Welcome text */}
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-300">
                <Sparkles size={17} />
                Great to see you again
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight">
                Your next step
                <br />
                <span className="text-indigo-400">starts right here.</span>
              </h2>

              <p className="mt-3 max-w-sm leading-7 text-slate-400">
                Sign in to access your account, continue your work, and make the
                most of your experience.
              </p>

              {/* Feature cards */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-colors hover:bg-white/[0.07] xl:p-4">
                  <CheckCircle2 className="mb-2 text-emerald-400" size={22} />

                  <p className="font-medium">Quick access</p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Get back to your account in a few steps.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-colors hover:bg-white/[0.07] xl:p-4">
                  <ShieldCheck className="mb-2 text-indigo-400" size={22} />

                  <p className="font-medium">Secure sign in</p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your account, ready when you are.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signin;
