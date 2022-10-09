import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CustomImage from '../../../components/CustomImage';
import { useRef } from 'react';
import { windowWidth } from '../../../constant/styles';

const ReviewImageList = ({images}) => {
  const bottomScroll = useRef();
  const imageList = [
    {
      image:
        'https://pbs.twimg.com/media/FT_jSx7UYAAtJj5?format=jpg&name=large',
    },
    {
      image:
        'https://pbs.twimg.com/media/FT_jSx7UYAAtJj5?format=jpg&name=large',
    },
    {
      image:
        'https://pbs.twimg.com/media/FT_jSx7UYAAtJj5?format=jpg&name=large',
    },
    {
      image:
        'https://pbs.twimg.com/media/FT_jSx7UYAAtJj5?format=jpg&name=large',
    },
    {
      image:
        'https://pbs.twimg.com/media/FT_jSx7UYAAtJj5?format=jpg&name=large',
    },
    {
      image:
        'https://pbs.twimg.com/media/FT_jSx7UYAAtJj5?format=jpg&name=large',
    },
    {
      image:
        'https://pbs.twimg.com/media/FT_jSx7UYAAtJj5?format=jpg&name=large',
    },
  ];
  const BottomImages = props => {
    const { item, index } = props;
    const { image } = item;

    const handleClick = page => {
      bottomScroll.current.scrollToIndex({ index: page });
    };
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          handleClick(index);
        }}
      >
        <View style={styles.imageList}>
          <CustomImage
            style={styles.smallImage}
            source={{ uri: image }}
            resizeMode="cover"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const handleOnLayout = () => {
    bottomScroll.current.scrollToIndex({ index: 0, animated: false });
  };
  return images.length > 0 &&  (
    <View style={styles.container}>
      <FlatList
        keyExtractor={({ image }, index) => {
          return `${image}-${index}`;
        }}
        onLayout={handleOnLayout}
        data={images}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={BottomImages}
        ref={bottomScroll}
      />
    </View>
  );
};

export default ReviewImageList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 28,
    paddingBottom: 25.5,
  },
  imageList: {
  },
  smallImage: {
    width: 97,
    height: 97,
    marginStart: 16,
  },
});
