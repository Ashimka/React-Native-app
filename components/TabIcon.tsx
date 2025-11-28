import { Image, ImageSourcePropType } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
}

const TabIcon = ({ focused, icon }: TabIconProps) => {
  return (
    <>
      <Image
        source={icon}
        tintColor={focused ? "#fff" : "#d6c6ff"}
        className="size-6"
      />
    </>
  );
};

export default TabIcon;
