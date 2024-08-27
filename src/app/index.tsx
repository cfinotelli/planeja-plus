import React from "react";
import { ScrollView, View } from "react-native";
import { HeadingTemplate } from "./_components/heading-template";
import { Logo } from "./_components/logo";
import { NavigationTabs } from "./_components/navigation-tabs";
import { Notifications } from "@/lib/notifications";
import { ToggleThemeSwitch } from "./_components/toggle-theme-switch";
import { HomeTodayReminders } from "./_components/home-today-reminders";
import { HomeLists } from "./_components/home-lists";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Page() {
  return (
    <View className="flex-1 w-full">
      <HeadingTemplate
        headerChildren={
          <>
            <View className="flex-row space-x-1 items-center">
              <Logo />
            </View>

            <ToggleThemeSwitch />
          </>
        }
        footerChildren={<NavigationTabs />}
      />

      <ScrollView className="p-5">
        <HomeLists />

        <HomeTodayReminders />
      </ScrollView>
    </View>
  );
}
