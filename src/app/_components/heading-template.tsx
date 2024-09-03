import React, { ReactNode } from "react";
import { View } from "react-native";
import { BannerAds } from "./banner-ads";

interface HeadingTemplateProps {
  headerChildren?: ReactNode;
  footerChildren?: ReactNode;
  pageContent: ReactNode;
}

export const HeadingTemplate = ({
  headerChildren,
  footerChildren,
  pageContent,
}: HeadingTemplateProps) => {
  return (
    <>
      <View className="flex-col space-y-5 bg-slate-900/90 p-5 pt-12">
        <View className="flex-row justify-between items-center">
          {headerChildren}
        </View>

        {footerChildren && (
          <View className="flex-row justify-between items-center">
            {footerChildren}
          </View>
        )}
      </View>
      <View className="flex-1 w-full">
        <BannerAds />
        {pageContent}
      </View>
    </>
  );
};
