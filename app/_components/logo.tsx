import React from "react";
import { Image } from "react-native";
import LogoImage from "../../assets/images/logo.png";

export const Logo = () => {
  return (
    <Image
      source={LogoImage}
      alt="Logo do aplicativo Planeja Plus"
      className="w-[120px] h-[50px]"
    />
  );
};
