import { cn } from "@/lib/cn";
import { useColorScheme } from "nativewind";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = ({
  visible,
  onAccept,
  onCancel,
}: ConfirmationModalProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-slate-900/80 bg-opacity-50">
        <View
          className={cn(
            colorScheme === "light" && "bg-slate-100",
            "w-80 dark:bg-slate-700 p-5 rounded-md shadow-lg"
          )}
        >
          <Text className="text-lg mb-4 dark:text-slate-50">
            Deseja mesmo fazer isso?
          </Text>
          <View className="flex-row justify-end space-x-2">
            <TouchableOpacity onPress={onCancel} className="p-2 rounded-md">
              <Text className="dark:text-slate-200">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onAccept}
              className="bg-red-400 p-2 px-4 rounded-md"
            >
              <Text className="text-red-900 font-bold">Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
