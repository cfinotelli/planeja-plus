import { useColorScheme } from "nativewind";
import React, { ReactNode } from "react";
import { Switch, View } from "react-native";
import colors from "tailwindcss/colors";

interface HeadingTemplate {
  headerChildren?: ReactNode;
  footerChildren?: ReactNode;
}

const HeadingTemplate = ({
  headerChildren,
  footerChildren,
}: HeadingTemplate) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-col space-y-2 bg-slate-800 p-5 pb-2 pt-12">
      <View className="flex-row justify-between items-center">
        {headerChildren}

        <Switch
          onValueChange={toggleColorScheme}
          value={colorScheme === "light"}
          trackColor={{ false: colors.slate[600], true: colors.slate[50] }}
          thumbColor={
            colorScheme === "light" ? colors.cyan[500] : colors.cyan[600]
          }
        />
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
