import React from "react";
import { navigate } from "hookrouter";

export default function Homepage() {
    const logout = () => {
        localStorage.removeItem("login_access_token");
        localStorage.removeItem("login_refresh_token");
        navigate("/");
        window.location.reload();
    };
    return (
        <div className="flex flex-col items-center mt-40 mb-40">
            <button
                className="flex items-center justify-center p-2 px-3 md:px-6 rounded bg-red-500 hover:bg-red-300 cursor-pointer"
                onClick={logout}>
                Logout
            </button>
        </div>
    );
}
