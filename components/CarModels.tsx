import { Brand, Model } from "@/types/auto";
import React from "react";
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CarModelsProps {
  brands: Brand;
  onClose: () => void;
  onModelSelect: (model: string) => void;
}

interface ModelItemProps {
  item: Model;
  onModelSelect: (model: string) => void;
}

const ModelItem = React.memo<ModelItemProps>(({ item, onModelSelect }) => (
  <TouchableOpacity
    className="bg-primary-light p-4 mx-1 mb-1"
    onPress={() => onModelSelect(item.model)}
  >
    <Text className="text-white text-lg">{item.model}</Text>
  </TouchableOpacity>
));

ModelItem.displayName = "ModelItem";
// Функция сравнения для memo
const areItemsEqual = (
  prevProps: ModelItemProps,
  nextProps: ModelItemProps
) => {
  return prevProps.item.model === nextProps.item.model;
};

const OptimizedModelItem = React.memo(ModelItem, areItemsEqual);

const CarModels = ({ brands, onClose, onModelSelect }: CarModelsProps) => {
  const [visibleCount, setVisibleCount] = React.useState(10);

  // const dataToShow = brands.models.slice(0, visibleCount);
  const dataToShow = React.useMemo(
    () => brands.models.slice(0, visibleCount),
    [brands.models, visibleCount]
  );

  const handleShowAll = React.useCallback(() => {
    setVisibleCount(brands.models.length);
  }, [brands.models.length]);

  const handleModelSelect = React.useCallback(
    (model: string) => {
      onModelSelect(model);
    },
    [onModelSelect]
  );

  const renderItem: ListRenderItem<Model> = React.useCallback(
    ({ item }) => (
      <OptimizedModelItem item={item} onModelSelect={handleModelSelect} />
    ),
    [handleModelSelect]
  );

  const keyExtractor = React.useCallback(
    (item: Model, index: number) => `${item.model}-${index}`,
    []
  );

  // Функция для вычисления layout (если высота фиксированная)
  const getItemLayout = React.useCallback(
    (_data: ArrayLike<Model> | null | undefined, index: number) => ({
      length: 60, // предполагаемая высота элемента (p-4 + mb-1)
      offset: 60 * index,
      index,
    }),
    []
  );

  // Компонент футера
  const ListFooterComponent = React.useCallback(
    () => (
      <TouchableOpacity
        className="mt-4 p-3 items-center"
        onPress={handleShowAll}
      >
        <Text className="text-sm text-primary-dark">
          {visibleCount <= 10 && brands.models.length > 10 && "Показать все"}
        </Text>
      </TouchableOpacity>
    ),
    [visibleCount, brands.models.length, handleShowAll]
  );
  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-surface-light text-lg">Выберите модель</Text>
        <TouchableOpacity onPress={onClose}>
          <Text className="text-surface-light text-xl p-2">&#10006;</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataToShow}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        getItemLayout={getItemLayout}
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

export default CarModels;
