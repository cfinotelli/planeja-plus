import { Text, View } from "react-native";

export const BannerAds = () => {
  return (
    <View className="p-1 flex-1 w-full items-center justify-center max-h-12 min-h-12">
      <View className="w-full bg-slate-300 border border-slate-400 flex-1 rounded-md items-center justify-center">
        <Text className="font-bold text-slate-50">banner ads</Text>
      </View>
    </View>
  );
};
