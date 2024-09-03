import { useRef } from "react";
import { Platform, View } from "react-native";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-4712672148809066~2178403059";

export const BannerAds = () => {
  const bannerRef = useRef<BannerAd>(null);

  useForeground(() => {
    Platform.OS === "ios" && bannerRef.current?.load();
  });

  return (
    <View className="flex-1 w-full items-center justify-center max-h-[80px]">
      <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          networkExtras: {
            collapsible: "bottom",
          },
        }}
        onAdFailedToLoad={(error) =>
          console.log("Ad failed to load: " + error, bannerRef.current?.load())
        }
      />
    </View>
  );
};
