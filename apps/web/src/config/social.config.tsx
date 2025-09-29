import { EMAIL_ADDRESSES } from "@raypx/shared";
import { MailIcon } from "lucide-react";

export const getSocialLinks = () => [
  {
    title: "Email",
    href: `mailto:${EMAIL_ADDRESSES.SUPPORT}`,
    icon: <MailIcon className="size-4 shrink-0" />,
  },
];
