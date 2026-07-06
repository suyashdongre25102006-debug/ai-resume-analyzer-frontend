import { Link } from "react-router-dom";

function Home()
{
    return (
        <div className="home-hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    AI Resume Analyzer
                </h1>

                <p className="hero-description">
                    Get AI powered feedback on your resume in seconds.
                </p>

                <div className="hero-buttons">
                    <Link to="/login">
                        <button className="btn-primary">
                            Login
                        </button>
                    </Link>

                    <Link to="/signup">
                        <button className="btn-secondary">
                            Signup
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;