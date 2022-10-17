// action
const SET_BOTTOMTAB_VISIBLE = 'status/BOTTOMBAR_VISIBLE';
const SET_START_TIME = 'status/START_TIME';
const SET_END_TIME = 'status/END_TIME';
const SET_IS_WALKING = 'status/IS_WALKING';
const SET_CURRENT_POSITION = 'status/SET_CURRENT_POSITION';
const SET_PIN_NUM = 'status/SET_PIN_NUM';
const SET_IS_RESTART = 'status/SET_IS_RESTART';
const SET_RESTART_WALKWAY = 'status/SET_RESTART_WALKWAY';
const SET_IS_CREATE = 'status/SET_IS_CREATE';
const SET_TEMP_WALKWAY_DATA = 'status/SET_TEMP_WALKWAY_DATA';

const SET_BADGES = 'status/SET_BADGES';

// action 생성 함수
export const setBottomTabVisible = boolean => ({
  type: SET_BOTTOMTAB_VISIBLE,
  boolean,
});

export const setStartTime = value => ({
  type: SET_START_TIME,
  value,
});

export const setEndTime = value => ({
  type: SET_END_TIME,
  value,
});

export const setIsWalking = boolean => ({
  type: SET_IS_WALKING,
  boolean,
});

export const setCurrentPosition = value => ({
  type: SET_CURRENT_POSITION,
  value,
});

export const setPinNum = value => ({
  type: SET_PIN_NUM,
  value,
});

export const setIsRestart = boolean => ({
  type: SET_IS_RESTART,
  boolean,
});

export const setRestartWalkway = value => ({
  type: SET_RESTART_WALKWAY,
  value,
});

export const setIsCreate = boolean => ({
  type: SET_IS_CREATE,
  boolean,
});

export const setTempWalkwayData = value => ({
  type: SET_TEMP_WALKWAY_DATA,
  value,
});

export const setBadges = value => ({
  type: SET_BADGES,
  value,
});

// reducer initial state
const initialState = {
  bottomTabVisible: true,
  startTime: '',
  endTime: '',
  isWalking: false,
  currentPosition: {},
  pinNum: 0,
  isRestart: false,
  restartWalkway: [],
  isCreate: false,
  tempWalkwayData: {},
  badges: [],
};

// reducer
export default function status(state = initialState, action) {
  switch (action.type) {
    case SET_BOTTOMTAB_VISIBLE:
      return {
        ...state,
        bottomTabVisible: action.boolean,
      };
    case SET_START_TIME:
      return {
        ...state,
        startTime: action.value,
      };
    case SET_END_TIME:
      return {
        ...state,
        endTime: action.value,
      };
    case SET_IS_WALKING:
      return {
        ...state,
        isWalking: action.boolean,
      };
    case SET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: action.value,
      };
    case SET_PIN_NUM:
      return {
        ...state,
        pinNum: action.value,
      };
    case SET_IS_RESTART:
      return {
        ...state,
        isRestart: action.boolean,
      };
    case SET_RESTART_WALKWAY:
      return {
        ...state,
        restartWalkway: action.value,
      };
    case SET_IS_CREATE:
      return {
        ...state,
        isCreate: action.boolean,
      };
    case SET_TEMP_WALKWAY_DATA:
      return {
        ...state,
        tempWalkwayData: action.value,
      };
    case SET_BADGES:
      return {
        ...state,
        badges: action.value,
      };
    default:
      return state;
  }
}
