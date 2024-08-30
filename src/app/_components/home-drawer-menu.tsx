import { useState } from "react";
import { ToggleThemeSwitch } from "./toggle-theme-switch";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";
import { cn } from "@/lib/cn";

export const HomeDrawerMenu = () => {
  const { colorScheme } = useColorScheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <TouchableOpacity
        className="rounded-md p-2 bg-slate-700"
        onPress={handleOpen}
      >
        <Feather name="menu" size={24} color={colors.cyan[600]} />
      </TouchableOpacity>

      {isOpen && (
        <Modal collapsable={true} visible={isOpen} transparent>
          <View className="bg-slate-900/80 bg-opacity-50 flex-1 justify-end items-end">
            <View className="h-full bg-white dark:bg-slate-800 w-3/4 p-5 pt-8 relative items-end space-y-2">
              <View className="flex-row justify-between items-center w-full mb-5">
                <Text
                  className={cn(
                    colorScheme === "light" && "text-slate-900",
                    "dark:text-slate-200 text-base font-extrabold"
                  )}
                >
                  Configurações
                </Text>

                <TouchableOpacity
                  className={cn(
                    colorScheme === "light" && "border-slate-900",
                    "rounded-md bg-transparent dark:border-slate-300 border-2 w-8 h-8 items-center justify-center"
                  )}
                  onPress={handleClose}
                >
                  <Feather
                    name="x"
                    size={24}
                    color={
                      colorScheme === "dark"
                        ? colors.slate[300]
                        : colors.slate[900]
                    }
                  />
                </TouchableOpacity>
              </View>

              <View
                className={cn(
                  colorScheme === "light" && "bg-slate-300",
                  "dark:bg-slate-700 flex-row justify-between items-center w-full rounded-md p-2"
                )}
              >
                <Text
                  className={cn(
                    colorScheme === "light" && "text-slate-900",
                    "dark:text-slate-200 text-base font-extrabold"
                  )}
                >
                  Tema:
                </Text>

                <ToggleThemeSwitch />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};
