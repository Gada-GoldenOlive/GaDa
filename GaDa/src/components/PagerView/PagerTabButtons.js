import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import InfiniteScroll from '../InfiniteScroll';
import PagerTabButton from './PagerTabButton';
import { windowWidth } from '../../constant/styles';

const PagerTabButtons = ({
  handlePage,
  titles = [],
  loop = false,
  initialIndex = 0,
}) => {
  const [focusedIdx, setFocusedIdx] = useState(initialIndex);

  return loop ? (
    <View>
      <InfiniteScroll
        data={titles}
        renderItem={({ item: title, index }) => {
          const handlePress = () => {
            handlePage(index % titles.length);
            setFocusedIdx(index % titles.length);
          };
          return (
            <PagerTabButton
              key={title}
              title={title}
              isFocused={focusedIdx === index % titles.length}
              handlePress={handlePress}
              buttonWidth={windowWidth / titles.length}
            />
          );
        }}
      />
    </View>
  ) : (
    <View style={styles.container}>
      {titles.map((title, idx) => {
        const handlePress = () => {
          setFocusedIdx(idx);
          handlePage(idx);
        };
        return (
          <PagerTabButton
            key={title}
            title={title}
            isFocused={focusedIdx === idx}
            handlePress={handlePress}
          />
        );
      })}
    </View>
  );
};

export default PagerTabButtons;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
