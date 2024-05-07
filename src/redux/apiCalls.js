import axios from "axios";
import { SUMMER_SHOP } from "../constants";
import {  request } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await request.post(`/auth/login`, user)
        console.log(res);
        localStorage.setItem(SUMMER_SHOP, res.data.accessToken)
        dispatch(loginSuccess(res.data.user))
    } catch (error) {
        dispatch(loginFailure())
    }
}