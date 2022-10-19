import axios, { handleNetworkError } from '../index';

export const createPin = async pinData => {
  console.log(pinData);
  const res = await axios
    .post(`/pins`, { ...pinData })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const getWalkwayPinList = async walkwayId => {
  const res = await axios
    .get(`/pins/?walkwayId=${walkwayId}`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};
export const updatePin = async (id, pinData) => {
  console.log({id, pinData})
  const res = await axios
    .patch(`/pins/${id}`, { ...pinData })
    .then(({ data }) => {return data})
    .catch(handleNetworkError);
  return res;
};

export const deletePin = async id => {
  const res = await axios
    .delete(`/pins/${id}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const getPinInfo = async pinId => {
  const res = await axios
    .get(`/pins/${pinId}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const createPinComments = async body => {
  const res = await axios
    .post(`/pins/comments`, { ...body })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};
export const getPinComments = async (pinId, page = 1) => {
  const res = await axios
    .get(`/pins/comments?pinId=${pinId}&page=${page}&limit=10`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const updatePinComments = async (commentId, body) => {
  const res = await axios
    .patch(`/pins/comments/${commentId}`, { ...body })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const deletePinComments = async commentId => {
  const res = await axios
    .delete(`/pins/comments/${commentId}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
