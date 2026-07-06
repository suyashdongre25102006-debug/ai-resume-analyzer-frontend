import { Link } from "react-router-dom";

function Navbar()
{
    const logout = () =>
    {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <nav className="navbar">

            <h2 className="logo">
                AI Resume Analyzer
            </h2>

            <div>

                <Link to="/">
                    Home
                </Link>

                &nbsp;&nbsp;&nbsp;

                <Link to="/upload">
                    Upload
                </Link>

                &nbsp;&nbsp;&nbsp;

                {
                    localStorage.getItem("token") &&
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                }

            </div>

        </nav>
    );
}

export default Navbar;