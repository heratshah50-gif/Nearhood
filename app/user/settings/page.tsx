"use client";

import { useState, useEffect } from "react";
import UserPanel from "@/components/layout/UserPanel";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

interface UserInfo {
  phoneNumber: string;
  name: string;
}

export default function UserSettingsPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const checkUserLogin = () => {
      if (typeof window !== "undefined") {
        const userStr = window.sessionStorage.getItem("nearhood_user");
        if (userStr) {
          try {
            setUserInfo(JSON.parse(userStr));
          } catch (e) {
            setUserInfo(null);
          }
        } else {
          setUserInfo(null);
        }
      }
    };

    checkUserLogin();
    window.addEventListener("userLoggedIn", checkUserLogin);
    return () => window.removeEventListener("userLoggedIn", checkUserLogin);
  }, []);

  if (!userInfo) {
    return (
      <>
        <Header onLoginClick={() => setIsLoginModalOpen(true)} />
        <div className="min-h-screen flex items-center justify-center pt-32 pb-16">
          <div className="text-center">
            <p className="text-lg text-neutral-600 mb-4">
              Please log in to access settings
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
        <Footer />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => {
            setIsLoginModalOpen(false);
            window.location.reload();
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header onLoginClick={() => setIsLoginModalOpen(true)} hideNavigation={true} />
      <div className="pt-24">
        <UserPanel>
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Settings
              </h1>
              <p className="text-neutral-600">
                Manage your account settings and preferences.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userInfo.name}
                    readOnly
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={`+91 ${userInfo.phoneNumber}`}
                    readOnly
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-600"
                  />
                </div>
                <div className="pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-500">
                    Account settings and preferences will be available here.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </UserPanel>
      </div>
      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {
          setIsLoginModalOpen(false);
          window.location.reload();
        }}
      />
    </div>
  );
}
