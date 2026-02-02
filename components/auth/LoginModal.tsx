"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Phone,
  ArrowRight,
  CheckCircle2,
  Shield,
  Loader2,
  RefreshCw,
} from "lucide-react";
import OTPInput from "./OTPInput";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (isAdmin: boolean) => void;
}

type Step = "phone" | "otp" | "success";

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [step, setStep] = useState<Step>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState<string | null>(null);
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
      setStep("phone");
      setPhoneNumber("");
      setIsLoading(false);
      setResendTimer(30);
      setCanResend(false);
      setGeneratedOTP(null);
      }, 300);
    }
  }, [isOpen]);

  // Reset verification state when step changes to OTP
  useEffect(() => {
    if (step === "otp") {
      setVerificationAttempted(false);
    }
  }, [step]);

  // Resend timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleTempBypass = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "nearhood_user",
        JSON.stringify({
          phoneNumber: "9999999999",
          name: "Temp User",
        })
      );
      window.dispatchEvent(new Event("userLoggedIn"));
    }
    onSuccess?.(false);
    onClose();
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to send OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      // Store and display OTP for testing (until SMS is configured)
      if (data.otp) {
        setGeneratedOTP(data.otp);
        console.log(`[OTP] Your OTP is: ${data.otp}`);
      }

      // Small delay to ensure OTP is stored on server before allowing verification
      await new Promise(resolve => setTimeout(resolve, 100));

      setIsLoading(false);
      setStep("otp");
      setResendTimer(30);
      setCanResend(false);
      setVerificationAttempted(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage = error instanceof Error ? error.message : "Network error";
      alert(`Failed to send OTP: ${errorMessage}. Please check your connection and try again.`);
      setIsLoading(false);
    }
  };

  const handleOTPComplete = async (otp: string) => {
    // Prevent multiple calls
    if (isLoading || verificationAttempted) return;
    
    setIsLoading(true);
    setVerificationAttempted(true);
    
    // Ensure OTP is a clean string (remove any whitespace, ensure 6 digits)
    const cleanOTP = String(otp).trim().replace(/\s/g, "");
    
    // Validate OTP format
    if (cleanOTP.length !== 6 || !/^\d{6}$/.test(cleanOTP)) {
      alert("Please enter a valid 6-digit OTP.");
      setIsLoading(false);
      setVerificationAttempted(false);
      return;
    }
    
    // Small delay to ensure OTP is fully stored on server and state is stable
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      console.log(`[OTP Client] Verifying OTP for ${phoneNumber}: ${cleanOTP}`);
      
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp: cleanOTP }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(`[OTP Client] Verification failed: ${data.error}`);
        alert(data.error || "Invalid OTP. Please try again.");
        setIsLoading(false);
        setVerificationAttempted(false);
        // Force remount of OTP input to reset its state
        setStep("otp");
        return;
      }

      setIsLoading(false);

      // Set session based on user type
      if (data.isAdmin) {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("nearhood_admin", "1");
          window.sessionStorage.setItem("nearhood_user", JSON.stringify({
            phoneNumber,
            name: "Admin User",
          }));
          window.dispatchEvent(new Event("userLoggedIn"));
        }
        onSuccess?.(true);
        onClose();
        return;
      }

      if (data.isVendor) {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("nearhood_vendor", "1");
          window.sessionStorage.setItem("nearhood_user", JSON.stringify({
            phoneNumber,
            name: "Vendor User",
          }));
          window.dispatchEvent(new Event("userLoggedIn"));
        }
        onSuccess?.(true);
        onClose();
        return;
      }

      // Regular user login - store user info
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("nearhood_user", JSON.stringify({
          phoneNumber,
          name: `User ${phoneNumber.slice(-4)}`, // Use last 4 digits as name placeholder
        }));
      }

      setStep("success");
      setTimeout(() => {
        onClose();
        // Trigger a custom event to notify header of login
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("userLoggedIn"));
        }
      }, 2000);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
      setIsLoading(false);
      setVerificationAttempted(false);
      // Force remount of OTP input to reset its state
      setStep("otp");
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to resend OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      // Store and display OTP for testing (until SMS is configured)
      if (data.otp) {
        setGeneratedOTP(data.otp);
        console.log(`[OTP] Your OTP is: ${data.otp}`);
      }

      // Small delay to ensure OTP is stored on server
      await new Promise(resolve => setTimeout(resolve, 100));

      setIsLoading(false);
      setResendTimer(30);
      setCanResend(false);
      setVerificationAttempted(false);
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
      setIsLoading(false);
      setVerificationAttempted(false);
    }
  };

  const formatPhoneDisplay = (phone: string) => {
    if (phone.length <= 5) return phone;
    return `${phone.slice(0, 5)} ${phone.slice(5)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 bg-gradient-to-r from-primary-500 to-primary-600">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Temporary bypass login button (for testing only) */}
                <button
                  type="button"
                  onClick={handleTempBypass}
                  className="absolute bottom-3 right-4 text-[10px] px-2 py-1 rounded-full bg-white/15 border border-white/40 text-white font-medium hover:bg-white/25 transition-colors"
                >
                  Temp login
                </button>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {step === "success" ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <Phone className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h2
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step === "phone" && "Login / Sign Up"}
                      {step === "otp" && "Verify OTP"}
                      {step === "success" && "Welcome!"}
                    </h2>
                  </div>
                </div>
                <p className="text-primary-100 text-sm">
                  {step === "phone" && "Enter your phone number to continue"}
                  {step === "otp" && `OTP sent to +91 ${formatPhoneDisplay(phoneNumber)}`}
                  {step === "success" && "You have successfully logged in"}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {/* Phone Input Step */}
                  {step === "phone" && (
                    <motion.form
                      key="phone"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handlePhoneSubmit}
                    >
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Phone Number
                        </label>
                        <div className="flex">
                          <div className="flex items-center px-4 bg-neutral-100 border-2 border-r-0 border-neutral-200 rounded-l-xl">
                            <span className="text-neutral-600 font-medium">+91</span>
                          </div>
                          <input
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            value={phoneNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, "");
                              setPhoneNumber(value);
                            }}
                            placeholder="Enter 10 digit number"
                            className="flex-1 px-4 py-4 border-2 border-neutral-200 rounded-r-xl focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none text-lg tracking-wider"
                            autoFocus
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={phoneNumber.length !== 10 || isLoading}
                        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                          phoneNumber.length === 10 && !isLoading
                            ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl"
                            : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                        }`}
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Get OTP
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}

                  {/* OTP Step */}
                  {step === "otp" && (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-6">
                        <p className="text-sm text-neutral-600 text-center mb-4">
                          Enter the 6-digit code sent to your phone
                        </p>
                        
                        {/* Display OTP for testing (until SMS is configured) */}
                        {generatedOTP && (
                          <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                            <p className="text-xs text-primary-700 font-medium mb-1 text-center">
                              Your OTP (for testing):
                            </p>
                            <p className="text-2xl font-bold text-primary-600 text-center tracking-widest">
                              {generatedOTP}
                            </p>
                            <p className="text-xs text-primary-600 text-center mt-1">
                              Check console for OTP: {generatedOTP}
                            </p>
                          </div>
                        )}
                        
                        <OTPInput
                          key={`${step}-${verificationAttempted}`} // Force remount when step changes or after failed verification
                          length={6}
                          onComplete={handleOTPComplete}
                          disabled={isLoading}
                        />
                      </div>

                      {isLoading && (
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Loader2 className="w-5 h-5 animate-spin text-primary-500" />
                          <span className="text-sm text-neutral-500">Verifying...</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <button
                          onClick={() => setStep("phone")}
                          className="text-neutral-500 hover:text-neutral-700 transition-colors"
                        >
                          Change number
                        </button>
                        <button
                          onClick={handleResendOTP}
                          disabled={!canResend || isLoading}
                          className={`flex items-center gap-1 ${
                            canResend && !isLoading
                              ? "text-primary-600 hover:text-primary-700"
                              : "text-neutral-400 cursor-not-allowed"
                          }`}
                        >
                          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                          {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Success Step */}
                  {step === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </motion.div>
                      <h3
                        className="text-xl font-bold text-neutral-800 mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Login Successful!
                      </h3>
                      <p className="text-neutral-500">
                        Welcome to Nearhood. Start exploring properties!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {step !== "success" && (
                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-primary-50 border border-primary-100">
                    <Shield className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <p className="text-xs text-primary-700">
                      By continuing, you agree to our{" "}
                      <a href="#" className="underline font-medium">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="underline font-medium">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


