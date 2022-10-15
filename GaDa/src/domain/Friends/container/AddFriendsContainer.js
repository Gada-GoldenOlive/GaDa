import { StyleSheet } from 'react-native';
import React from 'react';
import AddFriendsScreen from '../screen/AddFriendsScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  SampleImage1,
  SampleImage2,
  SampleImage3,
} from '../../../constant/images/Sample';
import { addFriend, getUserList } from '../../../APIs/user';

const friendsList = [
  {
    name: '만두전골',
    image: SampleImage2,
    id: 12293,
  },
  {
    name: '상암동 정호연',
    image: SampleImage3,
    id: 10090,
  },
  {
    name: '산책왕 차돌',
    image: SampleImage3,
    id: 9252,
  },

  {
    name: '산책왕 뽀삐',
    image: SampleImage1,
    id: 5350,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 4940,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 3593,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 12,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 13,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 14,
  },
  {
    name: '만두전골',
    image: SampleImage2,
    id: 15,
  },
];

const AddFriendsContainer = ({ navigation }) => {
  const [searchList, setSearchList] = useState();
  const [searchId, setSearchId] = useState();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isCheckPopupVisible, setIsCheckPopupVisible] = useState(false);
  const [addUser, setAddUser] = useState({ id: -1, name: '' });

  const fetchSearchResults = async id => {
    const res = await getUserList(id);
    // console.log(res.users);
    const { users } = res;
    setSearchList(users);
  };
  const handleSearchButton = searchId => {
    fetchSearchResults(searchId);
  };
  const handleAddConfirmButton = async () => {
    await addFriend(addUser.id);
    closePopup();
    openCheckPopup();
  };
  const handleCheckConfirmButton = () => {
    closeCheckPopup();
    navigation.navigate('Friends');
  };
  const handleAddButton = (id, name) => {
    // setIsPopupVisible(!isPopupVisible);
    openPopup();
    setAddUser({ id, name });
  };
  const openPopup = () => {
    setIsPopupVisible(true);
  };
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const openCheckPopup = () => {
    console.log('들어와');
    setIsCheckPopupVisible(true);
  };
  const closeCheckPopup = () => {
    setIsCheckPopupVisible(false);
  };

  useEffect(() => {
    fetchSearchResults();
  }, []);

  return (
    <AddFriendsScreen
      searchList={searchList}
      handleAddConfirmButton={handleAddConfirmButton}
      handleCheckConfirmButton={handleCheckConfirmButton}
      handleSearchButton={handleSearchButton}
      handleAddButton={handleAddButton}
      closePopup={closePopup}
      closeCheckPopup={closeCheckPopup}
      isPopupVisible={isPopupVisible}
      isCheckPopupVisible={isCheckPopupVisible}
      addUser={addUser}
      searchId={searchId}
      setSearchId={setSearchId}
    />
  );
};

export default AddFriendsContainer;

const styles = StyleSheet.create({});
