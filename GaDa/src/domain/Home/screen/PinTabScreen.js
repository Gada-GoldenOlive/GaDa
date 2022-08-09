import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import PagerView from 'react-native-pager-view';
import PagerTabButtons from '../../../components/PagerView/PagerTabButtons';
import Text from '../../../components/MyText';
import FirstPin from '../components/FirstPin';
import { windowHeight } from '../../../constant/styles';
import PinItem from '../components/PinItem';
import { buttonColor } from '../../../constant/colors';
import LastPin from '../components/LastPin';
import StartButton from '../components/StartButton';
const ItemSeparatorComponent = () => {
  return <View style={styles.separatorContainer} />;
};
const ListHeaderComponent = () => {
  return <FirstPin />;
};
const ListFooterComponent = () => {
  return <LastPin />;
};
const PinTabScreen = () => {
  const titles = ['핀', '후기'];
  const ref = React.useRef(PagerView);
  const handlePage = p => {
    ref.current.setPage(p);
  };
  const tempPinList = [
    { id: 'a', title: 'pin1', content: 'hey', image: 'hey' },
    { id: 'b', title: 'pin2', content: 'hey', image: 'hey' },
    { id: 'c', title: 'pin3', content: 'hey', image: 'hey' },
    { id: 'd', title: 'pin4', content: 'hey', image: 'hey' },
    { id: 'e', title: 'pin5', content: 'hey', image: 'hey' },
    { id: 'f', title: 'pin6', content: 'hey', image: 'hey' },
    { id: 'g', title: 'pin7', content: 'hey', image: 'hey' },
  ];
  const renderItem = ({ item, index }) => {
    const { title } = item;
    return (
      <View>
        <PinItem item={item} index={index} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PagerTabButtons
        titles={titles}
        handlePage={handlePage}
        initialIndex={0}
      />
      <PagerView
        initialPage={0}
        scrollEnabled={false}
        style={styles.pagerView}
        ref={ref}
      >
        <View style={styles.listContainer}>
          <FlatList
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            data={tempPinList}
            disableVirtualization={false}
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            renderItem={({ item, index }) => renderItem({ item, index })}
            onEndReachedThreshold={0.7}
            contentContainerStyle={styles.pinListContainer}
            keyExtractor={(item, index) => `${item.id}-${index}`}
          />
        </View>
        <View style={styles.listContainer}>
          <Text>hi</Text>
        </View>
      </PagerView>
      <StartButton />
    </View>
  );
};

export default PinTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pagerView: {
    flex: 1,
  },
  listContainer: {
    width: '100%',
    height: '100%',
  },
  pinListContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  separatorContainer: {
    height: 12,
    width: '100%',
    borderStartColor: buttonColor,
    borderStartWidth: 2,
  },
});
