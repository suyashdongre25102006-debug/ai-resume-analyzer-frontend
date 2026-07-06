import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API = import.meta.env.VITE_API_URL || "https://ai-resume-analyzer-production-f666.up.railway.app";

    const signup = async () =>
    {
        if (!username.trim() || !password.trim()) {
            alert("Please enter both username and password.");
            return;
        }

        setLoading(true);

        try
        {
            await axios.post(
                `${API}/signup`,
                { username, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            alert("Signup Success");
            navigate("/login", { replace: true });
        }
        catch(error)
        {
            console.error("Signup failed", error);
            const message = error?.response?.data?.message || "Signup failed. Please try again.";
            alert(message);
        }
        finally
        {
            setLoading(false);
        }
    };

    return (
        <div className="container">

            <h1>Signup</h1>

            <input
                type="text"
                placeholder="Username"
                onChange={(e) =>
                    setUsername(
                        e.target.value
                    )
                }
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <br /><br />

            <button onClick={signup} disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
            </button>

            <br /><br />

            <Link to="/login">
                Login
            </Link>

        </div>
    );
}

export default Signup;