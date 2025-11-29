import autoData from "@/data/autoData";
import { Brand } from "@/types/auto";
import React from "react";
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CarBrandsProps {
  onClose: () => void;
  onBrandSelect: (brand: Brand) => void;
}

interface BrandItemProps {
  item: Brand;
  onBrandSelect: (brand: Brand) => void;
}

const BrandItem = React.memo<BrandItemProps>(({ item, onBrandSelect }) => (
  <TouchableOpacity
    className="bg-primary-light w-[48%] p-4 mx-1 mb-1"
    onPress={() => onBrandSelect(item)}
  >
    <Text className="text-white text-lg text-left">{item.brand}</Text>
  </TouchableOpacity>
));

BrandItem.displayName = "BrandItem";
// Функция сравнения для memo
const areItemsEqual = (
  prevProps: BrandItemProps,
  nextProps: BrandItemProps
) => {
  return prevProps.item.brand === nextProps.item.brand;
};

const OptimizedBrandItem = React.memo(BrandItem, areItemsEqual);

const CarBrands = ({ onClose, onBrandSelect }: CarBrandsProps) => {
  const [showAll, setShowAll] = React.useState(false);

  const filteredBrands = React.useMemo(
    () => (showAll ? autoData : autoData.filter((item) => item.popular)),
    [showAll]
  );

  const handleShowAll = React.useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  const handleBrandSelect = React.useCallback(
    (brand: Brand) => {
      onBrandSelect(brand);
    },
    [onBrandSelect]
  );

  const renderItem: ListRenderItem<Brand> = React.useCallback(
    ({ item }) => (
      <OptimizedBrandItem item={item} onBrandSelect={handleBrandSelect} />
    ),
    [handleBrandSelect]
  );

  const keyExtractor = React.useCallback(
    (item: Brand, index: number) => `${item.brand}-${index}`,
    []
  );

  // Компонент футера
  const ListFooterComponent = React.useCallback(
    () => (
      <TouchableOpacity className="mt-4 items-center" onPress={handleShowAll}>
        <Text className="text-primary-dark text-sm">
          {!showAll && "Показать все"}
        </Text>
      </TouchableOpacity>
    ),
    [showAll, handleShowAll]
  );

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-surface-light text-lg">Выберите бренд</Text>
        <TouchableOpacity onPress={onClose}>
          <Text className="text-surface-light text-xl p-2">&#10006;</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredBrands}
        numColumns={2}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CarBrands;
