import { FooterButton } from "@/app/_components/footer-button";
import { cn } from "@/lib/cn";
import { ListProps } from "@/stories/repo/repo-store.types";
import { useColorScheme } from "nativewind";
import { Text } from "react-native";
import { View, TextInput } from "react-native";

export const UpdatingList = ({
  currentUpdatedList,
  setCurrentUpdatedList,
  enableSaveButton,
  handleConfirmUpdate,
}: {
  currentUpdatedList: ListProps;
  setCurrentUpdatedList: React.Dispatch<React.SetStateAction<ListProps>>;
  enableSaveButton: boolean;
  handleConfirmUpdate: () => void;
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 h-full justify-between p-5">
      <View className="space-y-3">
        <Text className="dark:text-slate-50 font-bold text-base">
          Nome da lista:
        </Text>
        <TextInput
          onChange={(e) => {
            const { text } = e.nativeEvent;
            setCurrentUpdatedList((prev) => {
              return {
                ...prev,
                title: text,
              };
            });
          }}
          value={currentUpdatedList.title}
          className={cn(
            colorScheme === "light" && "bg-slate-200 text-slate-800",
            "p-3 px-4 dark:bg-slate-700 border-solid rounded-lg dark:text-slate-50 focus:border focus:border-cyan-400"
          )}
        />
      </View>

      <FooterButton
        available={enableSaveButton}
        title="Confirmar alteração"
        onPress={handleConfirmUpdate}
      />
    </View>
  );
};
