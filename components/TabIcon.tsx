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
        tintColor={focused ? "#60A5FA" : "#fff"}
        className="size-6"
      />
    </>
  );
};

export default TabIcon;
