import { SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";
import { CreateReminderLink } from "../_components/create-reminder-link";
import { GoBackButton } from "../_components/go-back-button";
import { HeadingTemplate } from "../_components/heading-template";
import { Reminders } from "../_components/reminders";

export default function Page() {
  return (
    <View className="flex-1 w-full">
      <HeadingTemplate
        headerChildren={
          <View className="flex-row flex-1 justify-between items-center">
            <GoBackButton />

            <View className="flex-row justify-center items-center space-x-2 p-1 rounded-md active:bg-slate-400">
              <SimpleLineIcons name="bell" size={24} color={colors.cyan[600]} />

              <Text className="font-bold text-sm capitalize text-slate-700">
                Lembretes
              </Text>
            </View>
          </View>
        }
        footerChildren={<CreateReminderLink />}
      />

      <Reminders />
    </View>
  );
}
