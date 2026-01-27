import { NextRequest, NextResponse } from "next/server";

// Declare global type for OTP store to persist across hot reloads
declare global {
  var otpStore: Map<string, { otp: string; expiresAt: number }> | undefined;
}

// Use global variable to persist OTP store across hot module reloads in development
// In production, use Redis or database instead
const otpStore = global.otpStore || new Map<string, { otp: string; expiresAt: number }>();

// Persist the store globally (important for Next.js dev mode with HMR)
if (process.env.NODE_ENV !== 'production') {
  global.otpStore = otpStore;
}

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via SMS service
async function sendOTPviaSMS(phoneNumber: string, otp: string): Promise<boolean> {
  try {
    // Option 1: Using MSG91 (Popular in India)
    // Uncomment and configure with your MSG91 credentials
    /*
    const msg91Response = await fetch("https://control.msg91.com/api/v5/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authkey": process.env.MSG91_AUTH_KEY || "",
      },
      body: JSON.stringify({
        template_id: process.env.MSG91_TEMPLATE_ID || "",
        mobile: `91${phoneNumber}`,
        otp: otp,
      }),
    });
    return msg91Response.ok;
    */

    // Option 2: Using TextLocal (Popular in India)
    // Uncomment and configure with your TextLocal credentials
    /*
    const textLocalResponse = await fetch("https://api.textlocal.in/send/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apikey: process.env.TEXTLOCAL_API_KEY || "",
        numbers: `91${phoneNumber}`,
        message: `Your Nearhood OTP is ${otp}. Valid for 5 minutes.`,
        sender: "NEARHD",
      }),
    });
    return textLocalResponse.ok;
    */

    // Option 3: Using Twilio (International)
    // Uncomment and configure with your Twilio credentials
    /*
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioClient = require("twilio")(accountSid, authToken);
    
    await twilioClient.messages.create({
      body: `Your Nearhood OTP is ${otp}. Valid for 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phoneNumber}`,
    });
    return true;
    */

    // For development/testing: Just log the OTP (remove in production)
    console.log(`[DEV] OTP for ${phoneNumber}: ${otp}`);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();

    // Normalize phone number (remove any non-digits, ensure it's exactly 10 digits)
    const normalizedPhone = String(phoneNumber).replace(/\D/g, "");
    
    // Validate phone number
    if (!normalizedPhone || normalizedPhone.length !== 10 || !/^\d{10}$/.test(normalizedPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    // Store OTP using normalized phone number
    otpStore.set(normalizedPhone, { otp, expiresAt });
    console.log(`[OTP Storage] Stored OTP for ${normalizedPhone}: ${otp}, Expires at: ${new Date(expiresAt).toISOString()}`);

    // Send OTP via SMS
    const sent = await sendOTPviaSMS(normalizedPhone, otp);

    if (!sent) {
      return NextResponse.json(
        { error: "Failed to send OTP. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      // Return OTP for testing (remove in production when SMS is configured)
      otp, // Always return OTP for now until SMS service is configured
    });
  } catch (error) {
    console.error("Error in send-otp API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Note: OTP verification now uses the global.otpStore directly in verify-otp/route.ts
