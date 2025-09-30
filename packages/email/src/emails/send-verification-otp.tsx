import { Text } from "@react-email/components";
import { EmailLayout } from "../components/layout";
import type { EmailTemplateProps } from "../types";

/**
 * Props for the send verification OTP component
 */
type SendVerificationOTPProps = Pick<EmailTemplateProps, "username" | "otp">;

/**
 * OTP verification email template
 */
const SendVerificationOTPEmail = ({ username, otp }: SendVerificationOTPProps) => (
  <EmailLayout preview="Your verification code">
    <Text className="font-bold text-2xl text-gray-800">Verify your email</Text>
    <Text className="text-gray-600">Hi {username},</Text>
    <Text className="text-gray-600">
      Please enter the following code to verify your email address:
    </Text>
    <Text className="my-4 block bg-gray-100 px-6 py-3 text-center font-mono text-xl">{otp}</Text>
    <Text className="mt-6 text-gray-500 text-sm">
      If you didn't request this code, you can safely ignore this email.
    </Text>
  </EmailLayout>
);

SendVerificationOTPEmail.PreviewProps = {
  username: "Raypx",
  otp: "596853",
};

export default SendVerificationOTPEmail;
