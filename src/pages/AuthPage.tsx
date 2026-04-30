import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, LogIn, UserPlus, AlertCircle, CheckCircle, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type Tab = "login" | "signup";
type SuccessState = "login" | "signup-confirmed" | "signup-needs-email" | null;

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessState>(null);

  // After a successful login, briefly show the banner then redirect
  useEffect(() => {
    if (success === "login") {
      const timer = setTimeout(() => navigate("/"), 1600);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  function switchTab(t: Tab) {
    setTab(t);
    setError(null);
    setPassword("");
    setConfirmPassword("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (tab === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    if (tab === "login") {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error);
      } else {
        setSuccess("login");
      }
    } else {
      const { error, needsConfirmation } = await signUp(email, password);
      if (error) {
        setError(error);
      } else {
        setSuccess(needsConfirmation ? "signup-needs-email" : "signup-confirmed");
      }
    }

    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">
      {/* Top bar */}
      <header className="border-b border-[#30363d] px-6 py-3 flex items-center gap-3">
        <BookOpen size={18} className="text-[#58a6ff]" />
        <button
          onClick={() => navigate("/")}
          className="text-sm font-mono text-[#8b949e] hover:text-[#e6edf3] transition-colors"
        >
          AP Computer Science A
          <span className="mx-2 text-[#30363d]">/</span>
          <span className="text-[#e6edf3]">Study Guide</span>
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <AnimatePresence mode="wait">

          {/* ── Login success ───────────────────────────────────────────────── */}
          {success === "login" && (
            <motion.div
              key="login-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm text-center"
            >
              <div className="bg-[#161b22] border border-[#3fb950]/40 rounded-xl p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-[#3fb950]/10 border border-[#3fb950]/30">
                    <CheckCircle size={28} className="text-[#3fb950]" />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-[#e6edf3] mb-2">
                  Logged in successfully!
                </h2>
                <p className="text-sm font-mono text-[#8b949e]">
                  Redirecting you to the study guide…
                </p>
                <div className="mt-5 h-1 rounded-full bg-[#21262d] overflow-hidden">
                  <motion.div
                    className="h-full bg-[#3fb950] rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Signup success — needs email confirmation ────────────────── */}
          {success === "signup-needs-email" && (
            <motion.div
              key="signup-confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm"
            >
              <div className="bg-[#161b22] border border-[#58a6ff]/40 rounded-xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-[#58a6ff]/10 border border-[#58a6ff]/30">
                    <Mail size={28} className="text-[#58a6ff]" />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-[#e6edf3] mb-2">
                  Account created!
                </h2>
                <p className="text-sm text-[#8b949e] leading-relaxed mb-1">
                  We sent a confirmation email to
                </p>
                <p className="text-sm font-mono text-[#58a6ff] mb-4 break-all">{email}</p>
                <p className="text-sm text-[#8b949e] leading-relaxed mb-6">
                  Click the link in that email to verify your account, then come back here to log in.
                </p>
                <button
                  onClick={() => { setSuccess(null); switchTab("login"); }}
                  className="w-full py-2.5 rounded-lg font-mono text-sm font-medium bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] transition-colors"
                >
                  Back to Log In
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Signup success — no email confirmation needed ────────────── */}
          {success === "signup-confirmed" && (
            <motion.div
              key="signup-confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm text-center"
            >
              <div className="bg-[#161b22] border border-[#3fb950]/40 rounded-xl p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-[#3fb950]/10 border border-[#3fb950]/30">
                    <CheckCircle size={28} className="text-[#3fb950]" />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-[#e6edf3] mb-2">
                  Account created successfully!
                </h2>
                <p className="text-sm font-mono text-[#8b949e] mb-6">
                  You're now logged in. Welcome!
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-2.5 rounded-lg font-mono text-sm font-medium bg-[#238636] hover:bg-[#2ea043] text-white transition-colors"
                >
                  Go to Study Guide
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Login / Signup form ─────────────────────────────────────────── */}
          {success === null && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm"
            >
              <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-[#30363d]">
                  {(["login", "signup"] as Tab[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => switchTab(t)}
                      className={`
                        flex-1 flex items-center justify-center gap-2
                        py-3.5 text-sm font-mono transition-colors duration-150
                        ${tab === t
                          ? "text-[#58a6ff] border-b-2 border-[#58a6ff] bg-[#58a6ff]/5"
                          : "text-[#8b949e] hover:text-[#e6edf3]"
                        }
                      `}
                    >
                      {t === "login"
                        ? <><LogIn size={14} /> Log In</>
                        : <><UserPlus size={14} /> Sign Up</>
                      }
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Error banner */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-2 text-xs font-mono text-[#ff7b72] bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2.5">
                          <AlertCircle size={13} className="mt-0.5 shrink-0" />
                          {error}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-[#8b949e] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="
                        w-full bg-[#0d1117] border border-[#30363d] rounded-lg
                        px-3 py-2.5 text-sm font-mono text-[#e6edf3]
                        placeholder-[#484f58] outline-none
                        focus:border-[#58a6ff]/60 focus:ring-1 focus:ring-[#58a6ff]/30
                        transition-colors
                      "
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-mono text-[#8b949e] mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="
                        w-full bg-[#0d1117] border border-[#30363d] rounded-lg
                        px-3 py-2.5 text-sm font-mono text-[#e6edf3]
                        placeholder-[#484f58] outline-none
                        focus:border-[#58a6ff]/60 focus:ring-1 focus:ring-[#58a6ff]/30
                        transition-colors
                      "
                    />
                  </div>

                  {/* Confirm password (sign-up only) */}
                  <AnimatePresence>
                    {tab === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-xs font-mono text-[#8b949e] mb-1.5">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          required={tab === "signup"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="
                            w-full bg-[#0d1117] border border-[#30363d] rounded-lg
                            px-3 py-2.5 text-sm font-mono text-[#e6edf3]
                            placeholder-[#484f58] outline-none
                            focus:border-[#58a6ff]/60 focus:ring-1 focus:ring-[#58a6ff]/30
                            transition-colors
                          "
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      w-full mt-2 py-2.5 rounded-lg font-mono text-sm font-medium
                      bg-[#238636] hover:bg-[#2ea043] text-white
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-colors duration-150
                    "
                  >
                    {submitting
                      ? (tab === "login" ? "Signing in…" : "Creating account…")
                      : (tab === "login" ? "Log In" : "Create Account")
                    }
                  </button>
                </form>
              </div>

              <p className="text-center text-xs font-mono text-[#6e7681] mt-5">
                Progress is saved to your account across devices.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
