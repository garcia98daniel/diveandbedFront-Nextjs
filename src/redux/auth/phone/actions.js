import {PHONE_VERIFY_ERROR, PHONE_VERIFY_REQUESTING, PHONE_VERIFY_SUCCESS} from "./constants";

export const phoneVerifyRequesting = (phone) => ({
    type: PHONE_VERIFY_REQUESTING,
    phone,
});

export const phoneVerifySuccess = () => ({
    type: PHONE_VERIFY_SUCCESS,
});

export const phoneVerifyError = (error) => ({
    type: PHONE_VERIFY_ERROR,
    error,
});