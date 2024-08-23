import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import HeadingTemplate from "../_components/heading-template";

import { ConfirmationModal } from "../_components/confirmation-modal";

import { formatRelativeToNow } from "@/helpers/format-relative-to-now";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import colors from "tailwindcss/colors";
import { GoBackButton } from "../_components/go-back-button";
import { cn } from "@/lib/cn";
import { Item } from "../_components/item";
import { CreateItemLink } from "../_components/create-item-link";
import { ListsEmpty } from "../_components/lists-empty";
import { FooterButton } from "../_components/footer-button";
import { useRepoStore } from "@/stories/repo/repo-store";
import { ListProps } from "@/stories/repo/repo-store.types";
import { useColorScheme } from "nativewind";

export default function Page() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colorScheme } = useColorScheme();

  const { items, lists, updateList, removeList } = useRepoStore(
    (state) => state
  );

  const currentItems = items.filter((item) => item.listId === id);
  const currentList = lists.find((list) => list.id === id);

  const [updating, setUpdating] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentUpdatedList, setCurrentUpdatedList] = useState<ListProps>(
    () => {
      return currentList?.id ? currentList : ({} as ListProps);
    }
  );

  const handleGoBack = () => navigation.goBack();

  if (!currentList) {
    return handleGoBack();
  }

  const handleToogleUpdateList = () => {
    setUpdating((prev) => !prev);
  };

  const handleConfirmUpdate = () => {
    updateList(currentUpdatedList);
    setUpdating(false);
  };

  const handleDeleteList = () => {
    removeList(currentList.id);
    setUpdating(false);
    handleGoBack();
  };

  let enableSaveButton: boolean =
    currentUpdatedList.title !== currentList.title;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 w-full"
    >
      <HeadingTemplate
        headerChildren={
          <>
            <GoBackButton />

            <TouchableOpacity
              onPress={handleToogleUpdateList}
              activeOpacity={0.7}
              className={cn(
                updating ? "bg-slate-900" : "bg-slate-700",
                "py-2 px-4 rounded-md"
              )}
            >
              <Text className="text-xs font-bold text-slate-100 text-center  flex-row items-center">
                {updating ? "Alterando" : "Alterar"} lista{" "}
                <MaterialCommunityIcons
                  name="grease-pencil"
                  size={12}
                  color={colors.slate[200]}
                />
              </Text>
            </TouchableOpacity>
          </>
        }
        footerChildren={
          <View
            className={cn(
              colorScheme === "light" && "bg-slate-200",
              "p-2 items-center justify-start dark:bg-slate-700 flex-1 rounded-md space-y-2"
            )}
          >
            <Text className="text-xs truncate font-bold text-start w-full items-center dark:text-slate-200">
              Lista:{" "}
              <Text className="font-normal italic items-center">
                {currentList && currentList.title}
              </Text>
            </Text>

            <Text className="text-xs truncate font-bold text-start w-full items-center dark:text-slate-200">
              Criada em:{" "}
              <Text className="font-normal italic items-center">
                {formatRelativeToNow(currentList.createdAt)}
              </Text>
            </Text>

            <Text
              className={cn(
                currentItems.length >= 1 && "mb-3",
                updating && "mb-3",
                "text-xs truncate font-bold text-start w-full items-center dark:text-slate-200"
              )}
            >
              Itens desta lista:{" "}
              <Text className="font-normal italic items-center">
                {currentItems.length}
              </Text>
            </Text>

            {!updating && currentItems.length >= 1 && (
              <CreateItemLink listId={currentList.id} />
            )}

            {updating && (
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
                className="w-full p-2 rounded-md bg-red-400 items-center"
              >
                <Text className="text-red-900 font-bold ">
                  Deseja deletar está lista?
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {!updating && (
        <>
          <ScrollView>
            <View className="px-2 py-5 pb-6 gap-2">
              {currentItems.length >= 1 ? (
                <>
                  {currentItems.map((item) => (
                    <View key={item.id}>
                      <Item item={item} />
                    </View>
                  ))}
                </>
              ) : (
                <View>
                  <ListsEmpty listId={currentList.id} />
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}

      {updating && (
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
      )}

      <ConfirmationModal
        visible={isModalVisible}
        onAccept={handleDeleteList}
        onCancel={() => setModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}
