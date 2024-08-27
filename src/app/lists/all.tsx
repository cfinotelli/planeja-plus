import { Text, View } from "react-native";
import { CreateListLink } from "../_components/create-list-link";
import { Lists } from "../_components/lists";
import { HeadingTemplate } from "../_components/heading-template";
import { GoBackButton } from "../_components/go-back-button";
import { ListIcon } from "@/assets/icons";

export default function Page() {
  return (
    <View className="flex-1 w-full">
      <HeadingTemplate
        headerChildren={
          <View className="flex-row flex-1 justify-between items-center">
            <GoBackButton />

            <View className="flex-row justify-center items-center space-x-2 p-1 rounded-md active:bg-slate-400">
              <ListIcon size={24} />
              <Text className="font-bold text-sm capitalize text-slate-50">
                Listas
              </Text>
            </View>
          </View>
        }
        footerChildren={<CreateListLink />}
      />

      <Lists />
    </View>
  );
}
