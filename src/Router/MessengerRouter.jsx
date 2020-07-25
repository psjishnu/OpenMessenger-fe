import React from "react";
import { useRoutes, useRedirect } from "hookrouter";
import MessengerNavbar from "../components/Navbars/MessengerNavbar";
import Homepage from "../components/Messenger/Homepage";
import ChatPage from "../components/Messenger/ChatPage";

const routes = {
    "/chat": () => <Homepage />,
    "/chat/:id": ({ id }) => <ChatPage userId={id} />,
};
// const links = [
//     {
//         link: "/home",
//         title: "Home",
//         icon: "",
//     },
// ];
const AshaworkerRouter = () => {
    useRedirect("/", "/chat");
    const pages = useRoutes(routes);

    return (
        <>
            <div className="min-h-screen bg-green-100">
                <MessengerNavbar />
                {pages}
                {/* {!pages ? (
                <div className="h-screen flex justify-center py-16">
                    Error 404: Page not found
                </div>
            ) : (
                    <AshaworkerNavbar pages={pages} menus={links} />
                )} */}
            </div>
        </>
    );
};

export default AshaworkerRouter;
