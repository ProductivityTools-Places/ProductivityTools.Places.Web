import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../Session/firebase";
import { useAuth } from "../../Session/AuthContext";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const ctx = useAuth();

    if (location.pathname.toLowerCase() === "/login") {
        return null;
    }

    const user = ctx?.data?.user;

    const handleLogout = () => {
        logout();
        navigate("/Login");
    };

    return (
        <header className="navbar">
            <div className="navbar__inner">
                <Link to="/" className="navbar__brand">
                    <div className="navbar__logo-wrapper">
                        <img
                            src={`${process.env.PUBLIC_URL}/Places_512.png`}
                            alt="Places logo"
                            className="navbar__logo"
                        />
                    </div>
                    <div className="navbar__titles">
                        <span className="navbar__subtitle">ProductivityTools</span>
                        <span className="navbar__title">Places</span>
                    </div>
                </Link>

                <div className="navbar__actions">
                    {user?.email && (
                        <div className="navbar__user" title={user.email}>
                            <span className="navbar__user-dot" aria-hidden="true" />
                            <span className="navbar__user-email">{user.email}</span>
                        </div>
                    )}

                    <button
                        id="logout-btn"
                        type="button"
                        className="navbar__logout-btn"
                        onClick={handleLogout}
                    >
                        <svg
                            className="navbar__logout-icon"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Wyloguj</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
