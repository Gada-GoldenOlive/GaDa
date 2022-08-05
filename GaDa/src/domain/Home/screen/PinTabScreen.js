import { StyleSheet, View } from 'react-native';
import React from 'react';
import PagerView from 'react-native-pager-view';
import PagerTabButtons from '../../../components/PagerView/PagerTabButtons';
import Text from '../../../components/MyText';

const PinTabScreen = () => {
  const titles = ['핀', '후기'];
  const ref = React.useRef(PagerView);
  const handlePage = p => {
    ref.current.setPage(p);
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
          <Text>hi</Text>
        </View>
        <View style={styles.listContainer}>
          <Text>hi</Text>
        </View>
      </PagerView>
    </View>
  );
};

export default PinTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  listContainer: {
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
});
