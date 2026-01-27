import { NextRequest, NextResponse } from "next/server";

// NOTE: OTP verification is bypassed for demo/testing purposes on Vercel
// In production, use a database or Redis to store OTPs persistently

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

    // DEMO MODE: Accept any valid 6-digit OTP for testing on Vercel
    // Since Vercel serverless functions are stateless, we can't store OTPs in memory
    // In production, replace this with database/Redis OTP verification
    console.log(`[OTP Verify] Demo mode - accepting OTP ${normalizedOTP} for phone ${normalizedPhone}`);

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
