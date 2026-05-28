import { auth, signInWithGoogle } from "./firebase"
import { useNavigate } from "react-router-dom";

export default function Login() {

    let navigate=useNavigate();

    const signIn = async () => {
        let user = await signInWithGoogle();
        if (user) {
            navigate("/")
        }
    }

    return (
        <div className="login">
            <div className="login__container">
                <button className="login__btn login__google" onClick={signIn}>
                    Login with Google1
                </button>
            </div>
        </div>
    )
}