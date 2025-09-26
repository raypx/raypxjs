"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@raypx/ui/components/avatar";
import { Button } from "@raypx/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@raypx/ui/components/dialog";
import { Input } from "@raypx/ui/components/input";
import { Label } from "@raypx/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@raypx/ui/components/select";
import { Switch } from "@raypx/ui/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@raypx/ui/components/tabs";
import { Textarea } from "@raypx/ui/components/textarea";
import { Bell, Camera, Palette, Save, Settings, Shield, User } from "lucide-react";
import { useState } from "react";

type SettingsModalProps = {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function SettingsModal({ trigger, open, onOpenChange }: SettingsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const controlled = open !== undefined;
  const isOpenState = controlled ? open : isOpen;
  const setIsOpenState = controlled ? onOpenChange : setIsOpen;

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "Software engineer with 5+ years of experience in web development.",
    location: "San Francisco, CA",
    company: "Tech Corp",
    website: "https://johndoe.dev",
    timezone: "America/Los_Angeles",
    language: "en",
    theme: "system",
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    twoFactorAuth: true,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // 这里可以添加保存逻辑
    console.log("Saving settings:", formData);
    setIsOpenState?.(false);
  };

  const handleCancel = () => {
    setIsOpenState?.(false);
  };

  return (
    <Dialog onOpenChange={setIsOpenState} open={isOpenState}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Personal Settings
          </DialogTitle>
          <DialogDescription>
            Manage your personal information, preferences, and account settings.
          </DialogDescription>
        </DialogHeader>

        <Tabs className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger className="flex items-center gap-2" value="profile">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger className="flex items-center gap-2" value="preferences">
              <Palette className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger className="flex items-center gap-2" value="notifications">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger className="flex items-center gap-2" value="security">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent className="mt-6 space-y-6" value="profile">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <Avatar className="mx-auto mb-4 h-24 w-24">
                  <AvatarImage
                    alt="Profile"
                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${Math.random().toString(36).substring(2, 10)}`}
                  />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Change Photo
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      value={formData.firstName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      value={formData.lastName}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    type="email"
                    value={formData.email}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    value={formData.bio}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      value={formData.location}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      value={formData.company}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://example.com"
                    type="url"
                    value={formData.website}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent className="mt-6 space-y-6" value="preferences">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("timezone", value)}
                    value={formData.timezone}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("language", value)}
                    value={formData.language}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="ko">한국어</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    onValueChange={(value) => handleInputChange("theme", value)}
                    value={formData.theme}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Display Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compactMode">Compact Mode</Label>
                    <Switch id="compactMode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showAvatars">Show Avatars</Label>
                    <Switch defaultChecked id="showAvatars" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">Enable Animations</Label>
                    <Switch defaultChecked id="animations" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent className="mt-6 space-y-6" value="notifications">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-muted-foreground text-sm">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={formData.emailNotifications}
                      id="emailNotifications"
                      onCheckedChange={(checked) =>
                        handleInputChange("emailNotifications", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-muted-foreground text-sm">
                        Receive promotional and marketing emails
                      </p>
                    </div>
                    <Switch
                      checked={formData.marketingEmails}
                      id="marketingEmails"
                      onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-muted-foreground text-sm">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={formData.pushNotifications}
                      id="pushNotifications"
                      onCheckedChange={(checked) => handleInputChange("pushNotifications", checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent className="mt-6 space-y-6" value="security">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="twoFactorAuth">2FA Status</Label>
                    <p className="text-muted-foreground text-sm">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={formData.twoFactorAuth}
                    id="twoFactorAuth"
                    onCheckedChange={(checked) => handleInputChange("twoFactorAuth", checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Password</h3>
                <Button variant="outline">Change Password</Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Sessions</h3>
                <Button variant="outline">Manage Active Sessions</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex gap-2">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
