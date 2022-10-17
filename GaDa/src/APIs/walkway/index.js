import axios, { handleNetworkError } from '../index';

export const createWalkway = async walkwayData => {
  const res = await axios
    .post(`/walkways`, { ...walkwayData })
    .then(({ data }) => {
      console.log({ data });
      return data;
    })
    .catch(e => console.log(e.response.data));
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

export const getWalkwayInfo = async ({ id, lat = 0, lng = 0 }) => {
  console.log(id);
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

export const getMyWalkList = async (page = 1) => {
  /*
  rate는 (실제 이동한 거리/산책로의 거리) * 100
userId는 산책로 작성자가 아닌, 산책기록을 남긴 유저이고 distance, time은 walkway의 정보page는 page index, 1부터 시작 (default: 1)
limit는 한 페이지 내의 아이템 수 (default: 10)
*/
  const res = await axios
    .get(`/walkways/walks?page=${page}&limit=10`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

export const getNoReviewWalks = async () => {
  const res = await axios
    .get(`/walkways/no-review-walks`)
    .then(({ data }) => data)
    .catch(handleNetworkError);
  return res;
};

// 좌표로 주소 반환
export const getAddressByCoords = async ({ x, y }) => {
  const res = await axios
    .get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,
      {
        headers: {
          Authorization: `KakaoAK 680e8cc029c747e85c8bb3f8f2874da8`,
        },
      },
    )
    .then(({ data }) => data)
    .catch(e => console.log(e.response.data));
  return res;
};
