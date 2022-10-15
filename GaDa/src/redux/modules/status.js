// action
const SET_BOTTOMTAB_VISIBLE = 'status/BOTTOMBAR_VISIBLE';
const SET_START_TIME = 'status/START_TIME';
const SET_END_TIME = 'status/END_TIME';
const SET_IS_WALKING = 'status/IS_WALKING';
const SET_CURRENT_POSITION = 'status/SET_CURRENT_POSITION';
const SET_PIN_NUM = 'status/SET_PIN_NUM';
const SET_IS_RESTART = 'status/IS_RESTART';
const SET_RESTART_WALKWAY = 'statue/RESTART_WALKWAY';

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
    default:
      return state;
  }
}
