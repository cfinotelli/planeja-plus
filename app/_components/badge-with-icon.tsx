import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface BadgeWithIconProps extends TouchableOpacityProps {
  children: ReactNode;
}

export const BadgeWithIcon = ({ children, ...props }: BadgeWithIconProps) => {
  return (
    <TouchableOpacity
      className="rounded-full p-1 shadow-md max-w-[24px] max-h-[24px]"
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};
