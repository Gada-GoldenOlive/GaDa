// action
const SET_IS_AUTHENTICATED = 'user/SET_IS_AUTHENTICATED';
const SET_USER_ID = 'user/SET_USER_ID';
const SET_PW = 'user/SET_PW';
const SET_NICKNAME = 'user/SET_NICKNAME';
const SET_USER = 'user/SET_USER';

// action 생성 함수
export const setUser = object => ({
  type: SET_USER,
  object,
});

export const setIsAuthenticated = boolean => ({
  type: SET_IS_AUTHENTICATED,
  boolean,
});

export const setUserId = id => ({
  type: SET_USER_ID,
  id,
});

export const setPW = email => ({
  type: SET_PW,
  email,
});

export const setNickname = nickname => ({
  type: SET_NICKNAME,
  nickname,
});

// reducer initial state
const initialState = {
  isAuthenticated: false,
  userId: '',
  pw: '',
  nickname: '',
  user: {
    id: '',
    pw: '',
    nickname: '',
    image: null,
  },
};

// reducer
export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.object,
      };
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.boolean,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.id,
      };
    case SET_PW:
      return {
        ...state,
        pw: action.email,
      };

    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.nickname,
      };

    default:
      return state;
  }
}
