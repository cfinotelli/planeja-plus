import React, { ReactNode } from "react";
import { View } from "react-native";

interface HeadingTemplateProps {
  headerChildren?: ReactNode;
  footerChildren?: ReactNode;
}

export const HeadingTemplate = ({
  headerChildren,
  footerChildren,
}: HeadingTemplateProps) => {
  return (
    <View className="flex-col space-y-5 bg-slate-300 p-5 pt-14">
      <View className="flex-row justify-between items-center">
        {headerChildren}
      </View>

      {footerChildren && (
        <View className="flex-row justify-between items-center">
          {footerChildren}
        </View>
      )}
    </View>
  );
};
