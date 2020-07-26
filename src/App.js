import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES } from "./Common/constants";
import { FullLoading } from "./components/common/Loader";
import { getCurrentUser } from "./Redux/actions";
import PublicRouter from "./Router/PublicRouter";
import MessengerRouter from "./Router/MessengerRouter";
import { useAbortableEffect } from "./util/useAbortableEffect";
import "./Notify.css";

function App() {
    const dispatch = useDispatch();
    const state = useSelector((reduxState) => reduxState);
    const { currentUser } = state;
    const [user, setUser] = useState(false);

    useAbortableEffect(
        async (status) => {
            const access = localStorage.getItem("login_access_token");
            if (access) {
                const res = await dispatch(getCurrentUser());
                if (!status.aborted && res && res.statusCode === 200) {
                    setUser(res.data);
                }
            } else {
                setUser(null);
            }
        },
        [dispatch]
    );
    if (user !== null && (!currentUser || currentUser.isFetching)) {
        return <FullLoading />;
    }

    if (currentUser && currentUser.data) {
        if (currentUser.data.data.type === USER_TYPES.MESSAGER.type) {
            return <MessengerRouter />;
        } else {
            return <PublicRouter />;
        }
    } else {
        return <PublicRouter />;
    }
}

export default App;
