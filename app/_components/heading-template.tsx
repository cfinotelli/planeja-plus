import React, { ReactNode } from "react";
import { View } from "react-native";
import { BannerAds } from "./banner-ads";

interface HeadingTemplate {
  headerChildren?: ReactNode;
  footerChildren?: ReactNode;
}

const HeadingTemplate = ({
  headerChildren,
  footerChildren,
}: HeadingTemplate) => {
  return (
    <>
      <View className="flex-col space-y-2 bg-slate-800 p-5 pb-2 pt-12">
        <View className="flex-row justify-between items-center">
          {headerChildren}
        </View>

        {footerChildren && (
          <View className="flex-row justify-between items-center">
            {footerChildren}
          </View>
        )}
      </View>

      <BannerAds />
    </>
  );
};

export default HeadingTemplate;
