import { NextRequest, NextResponse } from "next/server";

// Declare global type for OTP store (same as in send-otp)
declare global {
  var otpStore: Map<string, { otp: string; expiresAt: number }> | undefined;
}

// Helper function to get stored OTP from global store
function getStoredOTP(phoneNumber: string): string | null {
  const otpStore = global.otpStore;
  if (!otpStore) {
    console.log(`[OTP Storage] OTP store not initialized`);
    return null;
  }
  
  const normalizedPhone = String(phoneNumber).replace(/\D/g, "");
  const stored = otpStore.get(normalizedPhone);
  
  if (!stored) {
    console.log(`[OTP Storage] No OTP found for ${normalizedPhone}`);
    console.log(`[OTP Storage] Current store keys:`, Array.from(otpStore.keys()));
    return null;
  }
  
  if (Date.now() > stored.expiresAt) {
    console.log(`[OTP Storage] OTP expired for ${normalizedPhone}`);
    otpStore.delete(normalizedPhone);
    return null;
  }
  
  console.log(`[OTP Storage] Retrieved OTP for ${normalizedPhone}: ${stored.otp}`);
  return stored.otp;
}

// Helper function to delete stored OTP
function deleteStoredOTP(phoneNumber: string): void {
  const otpStore = global.otpStore;
  if (otpStore) {
    const normalizedPhone = String(phoneNumber).replace(/\D/g, "");
    otpStore.delete(normalizedPhone);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, otp } = await request.json();

    // Validate inputs
    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { error: "Phone number and OTP are required" },
        { status: 400 }
      );
    }

    // Normalize phone number (remove any non-digits, ensure it's exactly 10 digits)
    const normalizedPhone = String(phoneNumber).replace(/\D/g, "");
    if (normalizedPhone.length !== 10) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Normalize OTP (remove any whitespace, ensure it's a string, exactly 6 digits)
    const normalizedOTP = String(otp).trim().replace(/\s/g, "");
    if (normalizedOTP.length !== 6 || !/^\d{6}$/.test(normalizedOTP)) {
      return NextResponse.json(
        { error: "Invalid OTP format. Please enter a 6-digit code." },
        { status: 400 }
      );
    }

    // Get stored OTP using normalized phone number (from global store)
    const storedOTP = getStoredOTP(normalizedPhone);

    // Debug logging
    console.log(`[OTP Verify] Phone: ${normalizedPhone}, Stored OTP: ${storedOTP}, Received OTP: ${normalizedOTP}`);

    if (!storedOTP) {
      console.log(`[OTP Verify] No stored OTP found for ${normalizedPhone}`);
      return NextResponse.json(
        { error: "OTP expired or invalid. Please request a new OTP." },
        { status: 400 }
      );
    }

    // Normalize stored OTP for comparison
    const normalizedStoredOTP = String(storedOTP).trim();

    // Verify OTP (compare as strings)
    if (normalizedStoredOTP !== normalizedOTP) {
      console.log(`[OTP Verify] Mismatch - Expected: "${normalizedStoredOTP}", Received: "${normalizedOTP}"`);
      return NextResponse.json(
        { error: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }

    // OTP verified successfully - delete it
    deleteStoredOTP(normalizedPhone);
    console.log(`[OTP Verify] Success for ${normalizedPhone}`);

    // Determine user type based on phone number (for demo purposes)
    // In production, check against your database
    const isAdmin = normalizedPhone === "9999999999";
    const isVendor = normalizedPhone === "8888888888";

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
      isAdmin,
      isVendor,
    });
  } catch (error) {
    console.error("Error in verify-otp API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
