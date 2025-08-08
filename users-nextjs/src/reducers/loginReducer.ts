import { LOGIN_FAIL, LOGIN_SUCCESS, SET_USER_NAME } from "@/constants/loginConstants";



export const LOGOUT_USER = "LOGOUT_USER"; // ✅ NUEVO

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  password?: string;
  rol: number;
  age?: number; // Optional, if age is not always provided
  
}

export interface AuthInterface {
  user: UserInterface | null;
}

const initialState: AuthInterface = {
  user: null,
};

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserInterface;
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
}

interface UserNameAction {
  type: typeof SET_USER_NAME;
  payload: UserInterface;
}

interface LogoutUserAction {
  type: typeof LOGOUT_USER;
}

export type AuthActionTypes = LoginSuccessAction | LoginFailAction | UserNameAction | LogoutUserAction;

export const authReducer = (
  state: AuthInterface = initialState,
  action: AuthActionTypes
): AuthInterface => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SET_USER_NAME:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case LOGOUT_USER: // ✅ NUEVO
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
