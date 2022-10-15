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
  return res;
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
  /* rate는 (실제 이동한 거리/산책로의 거리) * 100 / userId는 산책로 작성자가 아닌, 산책기록을 남긴 유저 / 
  option이 0이면 산책로 정보와 함께 전체 walk 목록 리턴(최근활동), 
  1이면 time, distance에 유저 기록과 함께 아직 리뷰가 없는 walk 목록 리턴(산책로가져오기) / 
  option을 주지 않으면 최근활동 */

  const res = await axios
    .get(`/walkways/walks?option=${option}`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};
