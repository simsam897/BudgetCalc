import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Lottie } from "lottie-react";
import signupAnimation from "../../assets/signup-animation.json";

import {
  UserRound,
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

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup, loading } = useAuth();

  // Basic password-length indicator
  const passwordStrength =
    formData.password.length >= 10
      ? "Strong"
      : formData.password.length >= 6
        ? "Medium"
        : formData.password.length > 0
          ? "Weak"
          : "";

  // Update the input that changed
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // Submit signup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(formData);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong. Please try again.";

      setError(
        message.includes("E11000")
          ? "That username or email may already be registered."
          : message,
      );
    }
  };

  const inputWrapperClass =
    "group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 transition duration-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10";

  const inputClass =
    "w-full min-w-0 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600";

  const labelClass = "mb-2 block text-sm font-medium text-slate-300";

  const featureCardClass =
    "rounded-2xl border border-white/10 bg-white/[0.04] p-3 xl:p-4";

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-10 lg:py-10">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      {/* Main layout */}
      <div className="relative mx-auto grid max-w-6xl items-stretch gap-10 lg:min-h-[680px] lg:grid-cols-2 lg:gap-10 xl:gap-14">
        {/* LEFT: Signup form */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex w-full max-w-md flex-col justify-center lg:mx-0 lg:h-full lg:max-w-none"
        >
          {/* Heading */}
          <div className="mb-6 text-center lg:mb-5 lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-300">
              <Sparkles size={16} />
              Your journey starts here
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Join us today and get started in just a few steps.
            </p>
          </div>

          {/* Signup form card */}
          <fieldset className="min-w-0 rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 pb-5 pt-2 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-6 sm:pb-6">
            <legend className="mx-auto px-3 text-sm font-semibold text-indigo-300 lg:mx-0">
              Sign up
            </legend>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className={labelClass}>
                  Username
                </label>

                <div className={inputWrapperClass}>
                  <UserRound
                    size={19}
                    className="shrink-0 text-slate-500 transition group-focus-within:text-indigo-400"
                  />

                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength={3}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>

                <div className={inputWrapperClass}>
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
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className={inputWrapperClass}>
                  <LockKeyhole
                    size={19}
                    className="shrink-0 text-slate-500 transition group-focus-within:text-indigo-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className={inputClass}
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

                {/* Password strength */}
                <AnimatePresence>
                  {passwordStrength && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          Password strength
                        </span>

                        <span
                          className={`text-xs font-medium ${
                            passwordStrength === "Strong"
                              ? "text-emerald-400"
                              : passwordStrength === "Medium"
                                ? "text-amber-400"
                                : "text-rose-400"
                          }`}
                        >
                          {passwordStrength}
                        </span>
                      </div>

                      <div className="mt-2 flex gap-1.5">
                        {[1, 2, 3].map((level) => {
                          const active =
                            passwordStrength === "Strong" ||
                            (passwordStrength === "Medium" && level <= 2) ||
                            (passwordStrength === "Weak" && level === 1);

                          return (
                            <motion.div
                              key={level}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: active ? 1 : 0.6 }}
                              className={`h-1.5 flex-1 origin-left rounded-full ${
                                !active
                                  ? "bg-slate-700"
                                  : passwordStrength === "Strong"
                                    ? "bg-emerald-400"
                                    : passwordStrength === "Medium"
                                      ? "bg-amber-400"
                                      : "bg-rose-400"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Backend error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    key="signup-error"
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              {/* Security note */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={15} className="shrink-0 text-emerald-400" />
                Your information is handled securely.
              </div>
            </form>
          </fieldset>

          {/* Sign in link */}
          <p className="mt-5 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Sign in
            </Link>
          </p>
        </motion.div>

        {/* RIGHT: Animation panel */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="hidden lg:flex lg:h-full"
        >
          <div className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-slate-900/80 to-violet-500/10 p-5 xl:p-7">
            {/* Panel decoration */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative">
              {/* Panel heading */}
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-300">
                <Sparkles size={17} />A fresh start
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
                One small step.
                <br />
                <span className="text-indigo-400">New possibilities.</span>
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400 xl:text-base xl:leading-7">
                Create your account and get ready to make the most of your
                experience.
              </p>

              {/* Smaller Lottie animation */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-auto my-2 flex h-40 w-full max-w-[220px] items-center justify-center xl:h-44 xl:max-w-[240px]"
              >
                <Lottie
                  src={signupAnimation}
                  loop
                  autoplay
                  className="h-full w-full"
                />
              </motion.div>

              {/* Feature cards */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className={featureCardClass}>
                  <CheckCircle2 className="mb-2 text-emerald-400" size={22} />

                  <p className="text-sm font-medium xl:text-base">
                    Easy to get started
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Just a few details to create your account.
                  </p>
                </div>

                <div className={featureCardClass}>
                  <ShieldCheck className="mb-2 text-indigo-400" size={22} />

                  <p className="text-sm font-medium xl:text-base">
                    Built with care
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    A simple, smooth signup experience.
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

export default Signup;
