// // action
// const SET_IS_AUTHENTICATED = 'user/SET_IS_AUTHENTICATED';
// const SET_USER_ID = 'user/SET_USER_ID';
// const SET_EMAIL = 'user/SET_EMAIL';
// const SET_BIRTH_DATE = 'user/SET_BIRTH_DATE';
// const SET_NICKNAME = 'user/SET_NICKNAME';
// const SET_FOCUSED_STYLIST = 'user/SET_FOCUSED_STYLIST';
// const SET_PROFILE_EXISTENCE = 'user/SET_PROFILE_EXISTENCE';
// const SET_USER = 'user/SET_USER';
// const SET_IS_STYLING_FIRST = 'user/SET_IS_STYLING_FIRST';
// const SET_USER_PROFILE = 'user/SET_USER_PROFILE';

// // action 생성 함수
// export const setUser = object => ({
//   type: SET_USER,
//   object,
// });

// export const setIsAuthenticated = boolean => ({
//   type: SET_IS_AUTHENTICATED,
//   boolean,
// });

// export const setUserId = id => ({
//   type: SET_USER_ID,
//   id,
// });

// export const setEmail = email => ({
//   type: SET_EMAIL,
//   email,
// });

// export const setBirthDate = birthDate => ({
//   type: SET_BIRTH_DATE,
//   birthDate,
// });

// export const setNickname = nickname => ({
//   type: SET_NICKNAME,
//   nickname,
// });

// export const setFocusedStylist = value => ({
//   type: SET_FOCUSED_STYLIST,
//   value,
// });

// export const setProfileExistence = value => ({
//   type: SET_PROFILE_EXISTENCE,
//   value,
// });

// export const setIsStylingFirst = value => ({
//   type: SET_IS_STYLING_FIRST,
//   value,
// });

// export const setUserProfile = value => ({
//   type: SET_USER_PROFILE,
//   value: value === null ? 0 : value,
// });
// // reducer initial state
// const initialState = {
//   isAuthenticated: false,
//   userId: 0,
//   email: '',
//   nickname: '',
//   birthDate: null,
//   focusedStylist: '',
//   profileExistence: false,
//   user: {
//     id: 0,
//     stylist: 0,
//     email: '',
//     nickname: '',
//     image: null,
//   },
//   isStylingFirst: false,
//   profileId: 0,
// };

// // reducer
// export default function user(state = initialState, action) {
//   switch (action.type) {
//     case SET_USER:
//       return {
//         ...state,
//         user: action.object,
//       };
//     case SET_IS_AUTHENTICATED:
//       return {
//         ...state,
//         isAuthenticated: action.boolean,
//       };
//     case SET_USER_ID:
//       return {
//         ...state,
//         userId: action.id,
//       };
//     case SET_EMAIL:
//       return {
//         ...state,
//         email: action.email,
//       };
//     case SET_BIRTH_DATE:
//       return {
//         ...state,
//         birthDate: action.birthDate,
//       };
//     case SET_NICKNAME:
//       return {
//         ...state,
//         nickname: action.nickname,
//       };
//     case SET_FOCUSED_STYLIST:
//       return {
//         ...state,
//         focusedStylist: action.value,
//       };
//     case SET_PROFILE_EXISTENCE:
//       return {
//         ...state,
//         profileExistence: action.value,
//       };
//     case SET_IS_STYLING_FIRST:
//       return {
//         ...state,
//         isStylingFirst: action.value,
//       };
//     case SET_USER_PROFILE:
//       return {
//         ...state,
//         profileId: action.value,
//       };
//     default:
//       return state;
//   }
// }
