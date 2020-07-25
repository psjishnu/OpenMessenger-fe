import { fireRequest } from "./fireRequest";

export const login = (body) => {
    return fireRequest("login", [], body);
};
export const getCurrentUser = () => {
    return fireRequest("currentUser");
};
export const question = (body) => {
    return fireRequest("question", [], body);
};
export const worked = () => {
    return fireRequest("worked");
};
export const allchats = () => {
    return fireRequest("allchats");
};
export const getmsgs = (body) => {
    return fireRequest("getmsgs", [], body);
};
export const chat_to = (body) => {
    return fireRequest("chat_to", [], body);
};
