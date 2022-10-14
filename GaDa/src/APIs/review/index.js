import axios, { handleNetworkError } from '../index';

export const createReview = async reviewData => {
  console.log({reviewData})
  const res = await axios
    .post(`/reviews`, { ...reviewData })
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

export const getMyReviewList = async userId => {
  const res = await axios
    .get(`/reviews/feeds?userId=${userId}`)
    .then(({ data }) => data)
    .catch(e => console.log(e.response));
  return res;
};

export const getFeeds = async () => {
  const res = await axios
    .get(`/reviews/feeds/`)
    .then(({ data }) => data)
    .catch(e => console.log(e.response.data));
  return res;
};

export const getDetailFeed = async reviewId => {
  const res = await axios
    .get(`reviews/${reviewId}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const getLikeReviews = async () => {
  const res = await axios
    .get(`/reviews/like-reviews`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const createLikedReview = async reviewId => {
  const res = await axios
    .post(`/reviews/likes`, { reviewId: reviewId })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const deleteLikedReview = async reviewId => {
  const res = await axios
    .delete(`/reviews/likes/${reviewId}`)
    .then(({ data }) => {
      return { code: 201 };
    })
    .catch(handleNetworkError);
  return res;
};
