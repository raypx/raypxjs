import { Button, Text } from "@react-email/components";
import { EmailLayout } from "./layout-email";

export type OrganizationInviteEmailProps = {
  inviterName: string;
  inviterEmail: string;
  organizationName: string;
  role: string;
  inviteUrl: string;
  expiresIn?: string;
};

const OrganizationInviteEmail = ({
  inviterName,
  inviterEmail,
  organizationName,
  role,
  inviteUrl,
  expiresIn = "7 days",
}: OrganizationInviteEmailProps) => (
  <EmailLayout preview={`Invitation to join ${organizationName}`}>
    <Text className="font-bold text-2xl text-gray-800">
      You're invited to join {organizationName}
    </Text>

    <Text className="text-gray-600">
      {inviterName} ({inviterEmail}) has invited you to join <strong>{organizationName}</strong> as
      a <strong>{role}</strong>.
    </Text>

    <Text className="text-gray-600">
      Click the button below to accept the invitation and get started:
    </Text>

    <Button
      className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      href={inviteUrl}
    >
      Accept Invitation
    </Button>

    <Text className="mt-6 text-gray-500 text-sm">
      This invitation will expire in {expiresIn}. If you don't want to join this organization, you
      can safely ignore this email.
    </Text>

    <Text className="text-gray-500 text-sm">
      If the button doesn't work, you can copy and paste this link into your browser:
      <br />
      <span className="break-all">{inviteUrl}</span>
    </Text>
  </EmailLayout>
);

OrganizationInviteEmail.PreviewProps = {
  inviterName: "John Doe",
  inviterEmail: "john.doe@example.com",
  organizationName: "Acme Inc.",
  role: "Admin",
  inviteUrl: "https://example.com/invite",
};

export { OrganizationInviteEmail };
