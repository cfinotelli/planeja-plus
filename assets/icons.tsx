import { Entypo, Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

export const ClockIcon = ({ size }: { size: number }) => (
  <Feather name="clock" size={size} color={colors.cyan[600]} />
);

export const ListIcon = ({ size }: { size: number }) => (
  <Entypo name="list" size={size} color={colors.cyan[600]} />
);

export const CalendarIcon = ({ size }: { size: number }) => (
  <Feather name="calendar" size={size} color={colors.cyan[600]} />
);

export const CheckIcon = ({ size }: { size: number }) => (
  <Entypo name="check" size={size} color={colors.slate[200]} />
);

export const BlockIcon = ({ size }: { size: number }) => (
  <Entypo name="block" size={size} color={colors.slate[200]} />
);
