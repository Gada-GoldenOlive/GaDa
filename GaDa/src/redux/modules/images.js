// acion
const SET_PIN_IMAGE = 'images/SET_IMAGE';
const REFRESH_IMAGES = 'images/REFRESH_IMAGES';
const SET_UPLOAD_IMAGES_CHANGED = 'images/SET_UPLOAD_IMAGES_CHANGED';
const SET_WALKWAY_IMAGES = 'images/SET_WALKWAY_IMAGES';
const SET_PROFILE_IMAGE = 'images/SET_PROFILE_IMAGE';
const SET_IMAGE_FILE = 'images/SET_IMAGE_FILE';
const SET_IMAGE_FILE_LIST = 'images/SET_IMAGE_FILE_LIST';
const SET_THUMBNAIL_IMAGE = 'images/SET_THUMBNAIL_IMAGE';
const SET_THUMBNAIL_FILE = 'images/SET_THUMBNAIL_FILE';
const SET_IS_THUMBNAIL = 'images/SET_IS_THUMBNAIL';

// action 생성 함수
export const setPinImage = value => ({
  type: SET_PIN_IMAGE,
  value,
});
export const setUploadImagesChanged = boolean => ({
  type: SET_UPLOAD_IMAGES_CHANGED,
  boolean,
});
export const refreshImages = async () => ({
  type: REFRESH_IMAGES,
});

export const setWalkwayImages = value => ({
  type: SET_WALKWAY_IMAGES,
  value,
});

export const setProfileImage = value => ({
  type: SET_PROFILE_IMAGE,
  value,
});

export const setImageFile = value => ({
  type: SET_IMAGE_FILE,
  value,
});

export const setImageFileList = value => ({
  type: SET_IMAGE_FILE_LIST,
  value,
});

export const setThumbnailImage = value => ({
  type: SET_THUMBNAIL_IMAGE,
  value,
});
export const setThumbnailFile = value => ({
  type: SET_THUMBNAIL_FILE,
  value,
});
export const setIsThumbnail = boolean => ({
  type: SET_IS_THUMBNAIL,
  boolean,
});

// reducer initial state
const initialState = {
  pinImage: '',
  uploadImagesChanged: false,
  walkwayImages: [],
  profileImage: '',
  imageFile: null,
  imageFileList: [],
  thumbnailImage: '',
  thumbnailFile: '',
  isThumbnail: false,
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
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.value,
      };
    case SET_IMAGE_FILE:
      return {
        ...state,
        imageFile: action.value,
      };
    case SET_IMAGE_FILE_LIST:
      return {
        ...state,
        imageFileList: action.value,
      };
    case SET_THUMBNAIL_IMAGE:
      return {
        ...state,
        thumbnailImage: action.value,
      };
    case SET_THUMBNAIL_FILE:
      return {
        ...state,
        thumbnailFile: action.value,
      };
    case SET_IS_THUMBNAIL:
      return {
        ...state,
        isThumbnail: action.boolean,
      };
    case REFRESH_IMAGES:
      return initialState;

    default:
      return state;
  }
}
