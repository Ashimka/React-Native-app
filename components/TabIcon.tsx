import { Image, ImageSourcePropType, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
}

const TabIcon = ({ focused, icon }: TabIconProps) => {
  return (
    <View className="mt-4">
      <Image
        source={icon}
        tintColor={focused ? "#A8B5DB" : "#fff"}
        className="size-7"
      />
    </View>
  );
};

export default TabIcon;
