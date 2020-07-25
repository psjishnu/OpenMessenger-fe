export default {
    login: {
        path: "/api/v1/account/login",
        method: "POST",
        noAuth: true,
    },
    currentUser: {
        path: "/api/v1/account/user",
        method: "GET",
        noAuth: false,
    },
    question: {
        path: "/messages/new",
        method: "POST",
    },
    allchats: {
        path: "/messages/allchats",
        method: "get",
    },
    worked: {
        path: "/messages",
        method: "get",
    },
    getmsgs: {
        path: "/messages/all",
        method: "post",
    },
    chat_to: {
        path: "/api/v1/account/search",
        method: "post",
    },
};
