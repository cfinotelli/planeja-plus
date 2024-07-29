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
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/70 bg-opacity-50">
        <View className="w-80 bg-white p-5 rounded-md shadow-lg">
          <Text className="text-lg mb-4">Deseja mesmo fazer isso?</Text>
          <View className="flex-row justify-end space-x-2">
            <TouchableOpacity onPress={onCancel} className="p-2 rounded-md">
              <Text className="text-slate-800">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onAccept}
              className="bg-red-600 p-2 rounded-md"
            >
              <Text className="text-white">Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
