// acion
const SET_PIN_IMAGES = 'images/SET_IMAGES';
const REFRESH_IMAGES = 'images/REFRESH_IMAGES';
const SET_UPLOAD_IMAGES_CHANGED = 'images/SET_UPLOAD_IMAGES_CHANGED';

// action 생성 함수
export const setPinImages = value => ({
  type: SET_PIN_IMAGES,
  value,
});
export const setUploadImagesChanged = boolean => ({
  type: SET_UPLOAD_IMAGES_CHANGED,
  boolean,
});
export const refreshImages = () => ({
  type: REFRESH_IMAGES,
});

// reducer initial state
const initialState = {
  pinImages: [],
  uploadImagesChanged: false,
};

// reducer
export default function images(state = initialState, action) {
  switch (action.type) {
    case SET_PIN_IMAGES:
      return {
        ...state,
        pinImages: action.value,
      };
    case SET_UPLOAD_IMAGES_CHANGED:
      return {
        ...state,
        uploadImagesChanged: action.boolean,
      };
    case REFRESH_IMAGES:
      return initialState;

    default:
      return state;
  }
}
