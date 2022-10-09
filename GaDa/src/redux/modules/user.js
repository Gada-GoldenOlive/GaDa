// action
const SET_USER = 'user/SET_USER';
const SET_IS_AUTHENTICATED = 'user/SET_IS_AUTHENTICATED';
const SET_USER_ID = 'user/SET_USER_ID';
const SET_LOGIN_ID = 'user/SET_LOGIN_ID';
const SET_PW = 'user/SET_PW';
const SET_NICKNAME = 'user/SET_NICKNAME';

// action 생성 함수
export const setUser = value => ({
  type: SET_USER,
  value,
});

export const setIsAuthenticated = boolean => ({
  type: SET_IS_AUTHENTICATED,
  boolean,
});

export const setUserId = id => ({
  type: SET_USER_ID,
  id,
});

export const setLoginId = id => ({
  type: SET_LOGIN_ID,
  id,
})
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
  loginId: '',
  pw: '',
  nickname: '',
};

// reducer
export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log(action.value.nickname)
      const user = action.value;
      return {
        ...state,
        userId: user.id,
        loginId: user.loginId,
        pw: user.pw,
        nickname: user.nickname,
      };
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.boolean,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.value,
      };
    case SET_LOGIN_ID:
      return {
        ...state,
        loginId: action.value,
      }
    case SET_PW:
      return {
        ...state,
        pw: action.value,
      };

    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.value,
      };

    default:
      return state;
  }
}
