import {
        GET_ZONE_REQUESTING,
        GET_ZONE_SUCCESS,
        GET_ZONE_ERROR,

        ZONE_PAGE_RESET_STATE,
} from "./constants";


export const getZoneRequesting = (id) => ({
    type: GET_ZONE_REQUESTING,
    id
});
export const getZoneSuccess = (zone) => ({
    type: GET_ZONE_SUCCESS,
    zone
});
export const getZoneError = (error) => ({
    type: GET_ZONE_ERROR,
    error
});

export const zonePageResetState = () => ({
    type: ZONE_PAGE_RESET_STATE,
});