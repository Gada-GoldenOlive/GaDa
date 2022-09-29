// acion
const SET_PIN_IMAGE = 'images/SET_IMAGE';
const REFRESH_IMAGES = 'images/REFRESH_IMAGES';
const SET_UPLOAD_IMAGES_CHANGED = 'images/SET_UPLOAD_IMAGES_CHANGED';
const SET_WALKWAY_IMAGES = 'images/SET_WALKWAY_IMAGES';

// action 생성 함수
export const setPinImage = value => ({
  type: SET_PIN_IMAGE,
  value,
});
export const setUploadImagesChanged = boolean => ({
  type: SET_UPLOAD_IMAGES_CHANGED,
  boolean,
});
export const refreshImages = () => ({
  type: REFRESH_IMAGES,
});

export const setWalkwayImages = value => ({
  type: SET_WALKWAY_IMAGES,
  value,
});

// reducer initial state
const initialState = {
  pinImage: '',
  uploadImagesChanged: false,
  walkwayImages: [],
};

export default function images(state = initialState, action) {
  switch (action.type) {
    case SET_PIN_IMAGE:
      return {
        ...state,
        pinImage: action.value,
      };
    case SET_UPLOAD_IMAGES_CHANGED:
      return {
        ...state,
        uploadImagesChanged: action.boolean,
      };
    case SET_WALKWAY_IMAGES:
      return {
        ...state,
        walkwayImages: action.value,
      };
    case REFRESH_IMAGES:
      return initialState;

    default:
      return state;
  }
}
