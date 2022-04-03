import * as types from "./../constant/actionTypes.js";

const initialState = {
  username: "",
  email: "",
  birthday: "",
  password: "",
};

const userStateReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.USER_INPUT: {
      return {
        ...state,
        [action.payload[0]]: action.payload[1],
      }
    }

    default: {
      return state;
    }
  }

}

export default userStateReducer;