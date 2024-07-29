import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "tailwindcss/colors";
import { LinkButton } from "./link-button";

interface CreateItemLinkProps {
  listId?: string;
}

export const CreateItemLink = ({ listId }: CreateItemLinkProps) => {
  return (
    <LinkButton
      pathname="itens/create"
      title="Adicionar novo item"
      listId={listId}
      icon={<AntDesign name="plus" size={14} color={colors.slate[200]} />}
    />
  );
};
