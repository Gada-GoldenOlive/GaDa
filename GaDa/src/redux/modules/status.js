// action
const SET_BOTTOMTAB_VISIBLE = 'status/BOTTOMBAR_VISIBLE';

// action 생성 함수
export const setBottomTabVisible = boolean => ({
  type: SET_BOTTOMTAB_VISIBLE,
  boolean,
});

// reducer initial state
const initialState = {
  bottomTabVisible: true,
};

// reducer
export default function status(state = initialState, action) {
  switch (action.type) {
    case SET_BOTTOMTAB_VISIBLE:
      return {
        ...state,
        bottomTabVisible: action.boolean,
      };

    default:
      return state;
  }
}
