import axios, { handleNetworkError } from '../index';

export const createReview = async reviewData => {
  const res = await axios
    .post(`/review/`, { ...reviewData })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getReviewList = async ({ walkwayId }) => {
  const res = await axios
    .get(`/review/${walkwayId}/`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const updateReview = async (id, reviewData) => {
  const res = await axios
    .patch(`/review/${id}/`, { ...reviewData })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const deleteReview = async id => {
  const res = await axios
    .delete(`/review/${id}/`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
