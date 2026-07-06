import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login()
{
    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const API = import.meta.env.VITE_API_URL || "https://ai-resume-analyzer-production-f666.up.railway.app";

    const login = async () =>
    {
        try
        {
            const response =
                await axios.post(
                    `${API}/login`,
                    {
                        username,
                        password
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert(
                "Login Successful"
            );

            window.location.href =
                "/upload";
        }
        catch(error)
        {
            void error;
            alert(
                "Login Failed"
            );
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

            <button onClick={login}>
                Login
            </button>

            <br /><br />

            <Link to="/signup">
                Signup
            </Link>

        </div>
    );
}

export default Login;