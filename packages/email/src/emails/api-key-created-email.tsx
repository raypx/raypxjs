import { Button, Text } from "@react-email/components";
import { EmailLayout } from "../components/layout";

export type ApiKeyCreatedEmailProps = {
  username: string;
  keyName: string;
  keyPrefix: string;
  permissions?: string[];
  rateLimitInfo?: {
    maxRequests: number;
    timeWindow: string;
  };
  createdAt: string;
  dashboardUrl?: string;
  securityTips?: boolean;
};

const ApiKeyCreatedEmail = ({
  username,
  keyName,
  keyPrefix,
  permissions,
  rateLimitInfo,
  createdAt,
  dashboardUrl,
  securityTips = true,
}: ApiKeyCreatedEmailProps) => (
  <EmailLayout preview={`New API Key Created: ${keyName}`}>
    <Text className="font-bold text-2xl text-gray-800">🔑 New API Key Created</Text>

    <Text className="text-gray-600">Hi {username},</Text>

    <Text className="text-gray-600">
      A new API key has been successfully created for your account.
    </Text>

    <div className="my-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <Text className="mb-2 font-semibold text-gray-800">API Key Details:</Text>
      <Text className="my-1 text-gray-700 text-sm">
        <strong>Name:</strong> {keyName}
      </Text>
      <Text className="my-1 text-gray-700 text-sm">
        <strong>Key Prefix:</strong> {keyPrefix}***
      </Text>
      <Text className="my-1 text-gray-700 text-sm">
        <strong>Created:</strong> {createdAt}
      </Text>
      {permissions && permissions.length > 0 && (
        <Text className="my-1 text-gray-700 text-sm">
          <strong>Permissions:</strong> {permissions.join(", ")}
        </Text>
      )}
      {rateLimitInfo && (
        <Text className="my-1 text-gray-700 text-sm">
          <strong>Rate Limit:</strong> {rateLimitInfo.maxRequests} requests per{" "}
          {rateLimitInfo.timeWindow}
        </Text>
      )}
    </div>

    {securityTips && (
      <div className="my-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <Text className="mb-2 font-semibold text-yellow-800">🔒 Security Tips:</Text>
        <Text className="my-1 text-sm text-yellow-700">
          • Store your API key securely and never share it publicly
        </Text>
        <Text className="my-1 text-sm text-yellow-700">
          • Use environment variables to store keys in your applications
        </Text>
        <Text className="my-1 text-sm text-yellow-700">
          • Rotate your API keys regularly for better security
        </Text>
        <Text className="my-1 text-sm text-yellow-700">
          • Monitor your API usage and set up alerts for unusual activity
        </Text>
      </div>
    )}

    {dashboardUrl && (
      <>
        <Text className="text-gray-600">
          You can manage this API key and monitor its usage in your dashboard:
        </Text>

        <Button
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          href={dashboardUrl}
        >
          Manage API Keys
        </Button>
      </>
    )}

    <Text className="mt-6 text-gray-500 text-sm">
      If you didn't create this API key, please contact our support team immediately and review your
      account security settings.
    </Text>

    <Text className="text-gray-500 text-sm">
      Need help with API integration? Check out our documentation or contact our support team.
    </Text>
  </EmailLayout>
);

ApiKeyCreatedEmail.PreviewProps = {
  username: "Raypx",
  keyName: "API Key 1",
  keyPrefix: "1234567890",
  permissions: ["read", "write"],
  rateLimitInfo: {
    maxRequests: 1000,
    timeWindow: "1 hour",
  },
};

export default ApiKeyCreatedEmail;
