import { useState } from "react";
import { signInWithGoogle } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const user = await signInWithGoogle();
            if (user) {
                navigate("/");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="login">
            <div className="login__container">
                <div className="login__logo-wrapper">
                    <img
                        src={`${process.env.PUBLIC_URL}/Places_512.png`}
                        alt="ProductivityTools Places logo"
                        className="login__logo"
                    />
                </div>

                <div className="login__header">
                    <span className="login__brand">ProductivityTools</span>
                    <h1 className="login__title">Places</h1>
                    <p className="login__subtitle">
                        Zaloguj się, aby przeglądać i zarządzać odwiedzonymi miejscami.
                    </p>
                </div>

                <button
                    id="google-login-btn"
                    type="button"
                    className="login__btn login__google"
                    onClick={signIn}
                    disabled={isLoading}
                >
                    <svg
                        className="login__google-icon"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                        />
                        <path
                            fill="#34A853"
                            d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                        />
                    </svg>
                    <span>{isLoading ? "Logowanie..." : "Zaloguj się przez Google"}</span>
                </button>
            </div>
        </main>
    );
}