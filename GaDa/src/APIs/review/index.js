import axios, { handleNetworkError } from '../index';

export const createReview = async reviewData => {
  const res = await axios
    .post(`/review`, { ...reviewData })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getWalkwayReviewList = async id => {
  const res = await axios
    .get(`/reviews/?walkwayId=${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getUserList = async id => {
  const res = await axios
    .get(`/reviews/?userId=${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const updateReview = async (id, reviewData) => {
  const res = await axios
    .patch(`/reviews/${id}`, { ...reviewData })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const deleteReview = async id => {
  const res = await axios
    .delete(`/reviews/${id}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
