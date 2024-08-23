import React, { ReactNode } from "react";
import { Switch, View } from "react-native";
import { ToggleThemeSwitch } from "./toggle-theme-switch";

interface HeadingTemplate {
  headerChildren?: ReactNode;
  footerChildren?: ReactNode;
}

const HeadingTemplate = ({
  headerChildren,
  footerChildren,
}: HeadingTemplate) => {
  return (
    <View className="flex-col space-y-2 bg-slate-800 p-5 pb-2 pt-12">
      <View className="flex-row justify-between items-center">
        {headerChildren}

        <ToggleThemeSwitch />
      </View>

      {footerChildren && (
        <View className="flex-row justify-between items-center">
          {footerChildren}
        </View>
      )}
    </View>
  );
};

export default HeadingTemplate;
