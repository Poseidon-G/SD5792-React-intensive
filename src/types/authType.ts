// types.ts
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS';
export const LOGOUT = "LOGOUT"

export interface AuthState {
    email: string | null;
    isAdmin: boolean | null;
    error: string | null;
    token: string | null;
    refreshToken: string | null;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

// Auth Action Types
interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: { email: string };
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
}

interface VerifyTokenSuccessAction {
    type: typeof VERIFY_TOKEN_SUCCESS;
    payload: {
        token: string;
        refreshToken: string;
    }
}

interface LogoutAction {
    type: typeof LOGOUT;
    payload: {}
}

export interface RegisterUserBody {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}




export type AuthActionTypes = LoginSuccessAction | LoginFailureAction | VerifyTokenSuccessAction | LogoutAction;

