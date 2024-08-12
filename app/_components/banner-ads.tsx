import { useRef } from "react";
import { View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  MobileAds,
  useForeground,
} from "react-native-google-mobile-ads";
import { Platform } from "react-native";
import { adUnitId } from "@/lib/ads";

MobileAds().initialize();

export const BannerAds = () => {
  const bannerRef = useRef<BannerAd>(null);

  useForeground(() => {
    Platform.OS === "ios" && bannerRef.current?.load();
  });

  return (
    <View className="p-1 flex-1 items-center justify-center max-h-12">
      <View className=" w-full bg-slate-300 border border-slate-400 rounded-md flex-1 items-center justify-center">
        <BannerAd
          ref={bannerRef}
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
    </View>
  );
};
