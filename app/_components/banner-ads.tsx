import { adUnitBanner } from "@/lib/data/ads-units";
import { useRef } from "react";
import { View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

export const BannerAds = () => {
  const bannerRef = useRef<BannerAd>(null);

  return (
    <View className="p-1 flex-1 items-center justify-center max-h-12">
      {/* <View className=" w-full bg-slate-300 border border-slate-400 rounded-md flex-1 items-center justify-center"> */}
      <BannerAd
        ref={bannerRef}
        unitId={adUnitBanner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
      {/* </View> */}
    </View>
  );
};
