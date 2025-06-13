import { FooterButton } from "@/app/_components/footer-button";
import { ListProps } from "@/stories/repo/repo-store.types";
import { Text, TextInput, View } from "react-native";

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

  return (
    <View className="flex-1 h-full justify-between p-5">
      <View className="space-y-3">
        <Text className="font-bold text-base">
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
          className="p-3 px-4 bg-slate-200 border-solid rounded-lg text-slate-800 focus:border focus:border-cyan-400"
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
