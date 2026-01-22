import { NextRequest, NextResponse } from "next/server";
import { getStoredOTP, deleteStoredOTP } from "../send-otp/route";

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

    // Get stored OTP
    const storedOTP = getStoredOTP(phoneNumber);

    if (!storedOTP) {
      return NextResponse.json(
        { error: "OTP expired or invalid. Please request a new OTP." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (storedOTP !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }

    // OTP verified successfully - delete it
    deleteStoredOTP(phoneNumber);

    // Determine user type based on phone number (for demo purposes)
    // In production, check against your database
    const isAdmin = phoneNumber === "9999999999";
    const isVendor = phoneNumber === "8888888888";

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
