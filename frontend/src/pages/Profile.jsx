import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./main.css";

function Profile() {
    const { user, setUser, logout } = useAuth();
    const date = new Date(user?.createdAt);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const pretty_date = date.toLocaleTimeString('en-US', options);
    const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`${BACKEND_URL}/user/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData.user);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    logout();
                }
            };
            fetchUserData();
        } else {
            logout();
        }
    }, []);
    
    return <>
        <h3>Hello, {user?.firstname} {user?.lastname}!</h3>
        <p>You have been with us since {pretty_date}.</p>
        <div className="row">
            <a href="#" onClick={logout}>Logout</a>
        </div>
    </>;
}

export default Profile;
