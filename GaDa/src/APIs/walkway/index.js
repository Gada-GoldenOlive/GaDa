import axios, { handleNetworkError } from '../index';

export const createWalkway = async walkwayData => {
  const res = await axios
    .post(`/walkways`, { ...walkwayData })
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getWalkwayList = async ({ lng, lat }) => {
  const res = await axios
    .get(`/walkways/?lng=${lng}&lat=${lat}`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
  return res;
};

export const getWalkwayInfo = async ({ id, lat, lng }) => {
  const res = await axios
    .get(`/walkways/${id}?lat=${lat}&lng=${lng}`)
    .then(({ data }) => {
      return data;
    })
    .catch(handleNetworkError);
};
export const updateWalkway = async (id, walkwayData) => {
  const res = await axios
    .patch(`/walkways/${id}`, { ...walkwayData })
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const deleteWalkway = async id => {
  const res = await axios
    .delete(`/walkways/${id}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const getMyWalkList = async option => {
  const res = await axios
  .get(`/walkways/walks?option=${option}`)
  .then(({data}) =>  data)
  .catch(handleNetworkError);
  return res;
}