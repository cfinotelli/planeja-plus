import { Text, View } from "react-native";

export const BannerAds = () => {
  return (
    <View className="p-1 flex-1 items-center justify-center max-h-12">
      <View className=" w-full bg-slate-300 border border-slate-400 rounded-md flex-1 items-center justify-center">
        <Text className="font-bold text-slate-50">banner ads</Text>
      </View>
    </View>
  );
};
