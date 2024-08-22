import { Link } from "expo-router";
import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

interface LinkButtonProps {
  pathname: string;
  title: string;
  listId?: string;
  itemId?: string;
  id?: string;
  icon?: ReactNode;
}

export const LinkButton = ({
  icon,
  pathname,
  title,
  id,
  itemId,
  listId,
}: LinkButtonProps) => {
  return (
    <Link
      href={{
        pathname,
        params: {
          id,
          itemId,
          listId,
        },
      }}
      asChild
    >
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-full p-2 rounded-md items-center bg-slate-600 flex-row justify-center space-x-2"
      >
        {icon && icon}
        <Text className="text-slate-200 font-medium">{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};
