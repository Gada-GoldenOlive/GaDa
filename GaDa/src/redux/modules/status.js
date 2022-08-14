// action
const SET_BOTTOMTAB_VISIBLE = 'status/BOTTOMBAR_VISIBLE';
const SET_START_TIME = 'status/START_TIME';
const SET_END_TIME = 'status/END_TIME';
const SET_IS_WALKING = 'status/IS_WALKING';
const SET_CURRNET_POSITION = 'status/SET_CURRNET_POSITION';
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
  type: SET_CURRNET_POSITION,
  value,
});

// reducer initial state
const initialState = {
  bottomTabVisible: true,
  startTime: '',
  endTime: '',
  isWalking: false,
  currentPosition: {},
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
    case SET_CURRNET_POSITION:
      return {
        ...state,
        currentPosition: action.value,
      };
    default:
      return state;
  }
}
