import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus, AlertCircle, CheckCircle, Mail, ArrowLeft } from "lucide-react";
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
      if (error) setError(error);
      else setSuccess("login");
    } else {
      const { error, needsConfirmation } = await signUp(email, password);
      if (error) setError(error);
      else setSuccess(needsConfirmation ? "signup-needs-email" : "signup-confirmed");
    }

    setSubmitting(false);
  }

  const inputClass = `
    w-full bg-[#0d1117] border border-[#30363d] rounded
    px-3 py-2.5 text-sm font-mono text-[#e6edf3]
    placeholder-[#484f58] outline-none
    focus:border-[#58a6ff]/50 focus:ring-1 focus:ring-[#58a6ff]/20
    transition-colors duration-150
  `;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#30363d]/60 px-5 py-2.5 pt-[calc(env(safe-area-inset-top)+0.625rem)] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#58a6ff]" />
        <button
          onClick={() => navigate("/")}
          className="text-xs font-mono text-[#6e7681] hover:text-[#e6edf3] transition-colors"
        >
          apcsa / study-guide
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center px-5 py-16">
        <AnimatePresence mode="wait">

          {/* Login success */}
          {success === "login" && (
            <motion.div
              key="login-success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-sm text-center"
            >
              <div className="bg-[#161b22] border border-[#3fb950]/30 rounded-lg p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-[#3fb950]/10 border border-[#3fb950]/25">
                    <CheckCircle size={26} className="text-[#3fb950]" />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-[#e6edf3] mb-2">Logged in</h2>
                <p className="text-sm font-mono text-[#6e7681]">Redirecting…</p>
                <div className="mt-5 h-0.5 rounded-full bg-[#21262d] overflow-hidden">
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

          {/* Signup — email confirmation needed */}
          {success === "signup-needs-email" && (
            <motion.div
              key="signup-confirm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-sm"
            >
              <div className="bg-[#161b22] border border-[#58a6ff]/25 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-[#58a6ff]/10 border border-[#58a6ff]/25">
                    <Mail size={26} className="text-[#58a6ff]" />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-[#e6edf3] mb-2">Account created</h2>
                <p className="text-sm text-[#8b949e] leading-relaxed mb-1">
                  Confirmation sent to
                </p>
                <p className="text-sm font-mono text-[#58a6ff] mb-4 break-all">{email}</p>
                <p className="text-sm text-[#8b949e] leading-relaxed mb-6">
                  Click the link in the email to verify your account, then log in.
                </p>
                <button
                  onClick={() => { setSuccess(null); switchTab("login"); }}
                  className="w-full py-2.5 rounded font-mono text-sm font-medium bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] transition-colors"
                >
                  Back to Log In
                </button>
              </div>
            </motion.div>
          )}

          {/* Signup confirmed */}
          {success === "signup-confirmed" && (
            <motion.div
              key="signup-confirmed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-sm text-center"
            >
              <div className="bg-[#161b22] border border-[#3fb950]/30 rounded-lg p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-[#3fb950]/10 border border-[#3fb950]/25">
                    <CheckCircle size={26} className="text-[#3fb950]" />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-[#e6edf3] mb-2">Account created</h2>
                <p className="text-sm font-mono text-[#6e7681] mb-6">You're now logged in.</p>
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-2.5 rounded font-mono text-sm font-medium bg-[#238636] hover:bg-[#2ea043] text-white transition-colors"
                >
                  Go to Study Guide
                </button>
              </div>
            </motion.div>
          )}

          {/* Login / Signup form */}
          {success === null && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-sm"
            >
              {/* Back link */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1.5 text-xs font-mono text-[#6e7681] hover:text-[#e6edf3] transition-colors mb-6 group"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                Back to home
              </button>

              <div className="bg-[#161b22] border border-[#30363d]/80 rounded-lg overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-[#30363d]/80">
                  {(["login", "signup"] as Tab[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => switchTab(t)}
                      className={`
                        flex-1 flex items-center justify-center gap-1.5
                        py-3 text-sm font-mono transition-colors duration-150
                        ${tab === t
                          ? "text-[#58a6ff] border-b-2 border-[#58a6ff] bg-[#58a6ff]/5"
                          : "text-[#6e7681] hover:text-[#e6edf3]"
                        }
                      `}
                    >
                      {t === "login"
                        ? <><LogIn size={13} /> Log In</>
                        : <><UserPlus size={13} /> Sign Up</>
                      }
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-2 text-xs font-mono text-[#ff7b72] bg-red-900/15 border border-red-800/30 rounded px-3 py-2.5">
                          <AlertCircle size={12} className="mt-0.5 shrink-0" />
                          {error}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className="block text-xs font-mono text-[#6e7681] mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#6e7681] mb-1.5">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={inputClass}
                    />
                  </div>

                  <AnimatePresence>
                    {tab === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-xs font-mono text-[#6e7681] mb-1.5">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          required={tab === "signup"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className={inputClass}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      w-full mt-1 py-2.5 rounded font-mono text-sm font-medium
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

              <p className="text-center text-xs font-mono text-[#484f58] mt-4">
                Progress is saved to your account across devices.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
