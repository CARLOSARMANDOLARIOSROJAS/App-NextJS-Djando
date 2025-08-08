import { SET_USER_NAME } from "../constants/loginConstants";
import type { UserInterface } from "../reducers/loginReducer";


export const setUserName = (user: UserInterface | null) => {
    return {
        type:SET_USER_NAME,
        payload: user,
    };
}
