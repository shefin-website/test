import { Resend } from "resend";
import { ENV } from "./env.js";

// Create a resilient client that doesn't crash if API key is missing (e.g., local dev)
let resendClient;
const hasValidApiKey = ENV.RESEND_API_KEY && 
  ENV.RESEND_API_KEY.trim() !== "" && 
  !ENV.RESEND_API_KEY.includes("your_resend_api_key");

if (hasValidApiKey) {
  resendClient = new Resend(ENV.RESEND_API_KEY);
} else {
  if (ENV.NODE_ENV === "development") {
    console.warn(
      "RESEND_API_KEY is not set. Email sending is disabled in this environment."
    );
  }
  // No-op shim to avoid crashes when email is attempted in dev without a key
  resendClient = {
    emails: {
      send: async () => ({ data: null, error: null }),
    },
  };
}

export { resendClient };

export const sender = {
  email: ENV.EMAIL_FROM || "noreply@example.com",
  name: ENV.EMAIL_FROM_NAME || "Chatify",
};
