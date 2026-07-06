import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup()
{
    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const API = import.meta.env.VITE_API_URL;

    const signup = async () =>
    {
        try
        {
            await axios.post(
                `${API}/signup`,
                {
                    username,
                    password
                }
            );

            alert(
                "Signup Success"
            );

            window.location.href =
                "/login";
        }
        catch(error)
        {
            void error;
            alert(
                "Signup Failed"
            );
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

            <button onClick={signup}>
                Signup
            </button>

            <br /><br />

            <Link to="/login">
                Login
            </Link>

        </div>
    );
}

export default Signup;