import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API = import.meta.env.VITE_API_URL || "https://ai-resume-analyzer-production-f666.up.railway.app";

    const login = async () =>
    {
        if (!username.trim() || !password.trim()) {
            alert("Please enter both username and password.");
            return;
        }

        setLoading(true);

        try
        {
            const response = await axios.post(
                `${API}/login`,
                { username, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const token = response?.data?.token;

            if (!token) {
                throw new Error("No token received from server.");
            }

            localStorage.setItem("token", token);
            navigate("/upload", { replace: true });
        }
        catch(error)
        {
            console.error("Login failed", error);
            const message = error?.response?.data?.message || "Login failed. Please check your credentials.";
            alert(message);
        }
        finally
        {
            setLoading(false);
        }
    };

    return (
        <div className="container">

            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(
                        e.target.value
                    )
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <button onClick={login} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

            <br /><br />

            <Link to="/signup">
                Signup
            </Link>

        </div>
    );
}

export default Login;