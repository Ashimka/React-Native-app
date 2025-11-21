import { Image, ImageSourcePropType, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
}

const TabIcon = ({ focused, icon }: TabIconProps) => {
  return (
    <View className="my-4">
      <Image
        source={icon}
        tintColor={focused ? "#fff" : "#d6c6ff"}
        className="size-6"
      />
    </View>
  );
};

export default TabIcon;
