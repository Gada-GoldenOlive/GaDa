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
import { useDispatch, useSelector } from 'react-redux';
import { setBadges } from '../../../redux/modules/status';

const AddFriendsContainer = () => {
  const [searchList, setSearchList] = useState();
  const [searchId, setSearchId] = useState();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addUser, setAddUser] = useState({ id: -1, name: '' });
  const { badges } = useSelector(state => state.status);
  const dispatch = useDispatch();

  const fetchSearchResults = async id => {
    const res = await getUserList(id);
    console.log(res.users);
    const { users } = res;
    setSearchList(users);
  };
  const handleSearchButton = searchId => {
    fetchSearchResults(searchId);
  };
  const handleAddConfirmButton = async () => {
    const res = await addFriend(addUser.id);
    if (res) {
      const { achieves = [] } = res;
      if (achieves.length > 0) {
        dispatch(setBadges(achieves));
      }
    }
    closePopup();
  };
  const handleAddButton = (id, name) => {
    setIsPopupVisible(!isPopupVisible);
    setAddUser({ id, name });
  };
  const openPopup = () => {
    setIsPopupVisible(true);
  };
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    fetchSearchResults();
  }, []);

  return (
    <AddFriendsScreen
      searchList={searchList}
      handleAddConfirmButton={handleAddConfirmButton}
      handleSearchButton={handleSearchButton}
      handleAddButton={handleAddButton}
      closePopup={closePopup}
      openPopup={openPopup}
      isPopupVisible={isPopupVisible}
      addUser={addUser}
      searchId={searchId}
      badges={badges}
      setSearchId={setSearchId}
    />
  );
};

export default AddFriendsContainer;

const styles = StyleSheet.create({});
