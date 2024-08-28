import { ConfirmationModal } from "@/app/_components/confirmation-modal";
import { useRepoStore } from "@/stories/repo/repo-store";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

export const AskByDestroyList = ({
  listId,
  setUpdating,
}: {
  listId: string;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { removeList } = useRepoStore((state) => state);
  const navigation = useNavigation();

  const handleGoBack = () => navigation.goBack();

  const handleDeleteList = () => {
    removeList(listId);
    setUpdating(false);
    handleGoBack();
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
        className="w-full p-2 rounded-md bg-red-400 items-center"
      >
        <Text className="text-red-900 font-bold ">
          Deseja deletar está lista?
        </Text>
      </TouchableOpacity>

      {isModalVisible && (
        <ConfirmationModal
          visible={isModalVisible}
          onAccept={handleDeleteList}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </>
  );
};
