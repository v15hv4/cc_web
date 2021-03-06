import React, { useEffect } from "react"; // eslint-disable-line

import API from "../api/methods";

const LogoutRedirect = () => {
    useEffect(() => {
        async function logout() {
            const res = await API.logout();
            if (res.status === 200) window.location.href = res.data.logout_url;
        }
        logout();
    });
    return null;
};

export default LogoutRedirect;
