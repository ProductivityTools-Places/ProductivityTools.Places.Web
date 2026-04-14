import { initializeApp } from "firebase/app";
import { isJwtExpired } from 'jwt-check-expiration';


import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";

const devfirebaseConfig = {
    apiKey: "AIzaSyAi2YG0yEOJ00sLKM63Vbxfpdk_SqL7UvI",
    authDomain: "ptprojectsdev.firebaseapp.com",
    projectId: "ptprojectsdev",
    storageBucket: "ptprojectsdev.firebasestorage.app",
    messagingSenderId: "785198365463",
    appId: "1:785198365463:web:eb4dca317d62308e219552",
    measurementId: "G-L0X130L2DE"
};

const prodfirebaseConfig = {
    apiKey: "AIzaSyBxY4oT4SZd5r-nZiM1eFFnUCcC3UxgYr4",
    authDomain: "ptprojectsweb.firebaseapp.com",
    projectId: "ptprojectsweb",
    storageBucket: "ptprojectsweb.firebasestorage.app",
    messagingSenderId: "93484780890",
    appId: "1:93484780890:web:b541cd5e0469ce549ff763"
};

const configName = process.env.NODE_ENV === 'development' ? devfirebaseConfig : prodfirebaseConfig;
//const configName = prodfirebaseConfig;

const app = initializeApp(configName);
const auth = getAuth(app)


const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/photoslibrary.readonly');
googleProvider.addScope('https://www.googleapis.com/auth/photoslibrary');

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
        localStorage.setItem("token", res.user.accessToken);

        const credential = GoogleAuthProvider.credentialFromResult(res);
        if (credential) {
            localStorage.setItem("googleAccessToken", credential.accessToken);
            console.log("Google access token saved");
        }

        console.log("token validation");
        let token = localStorage.getItem('token');
        console.log("token from localstorage", token);
        return res.user;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("googleAccessToken");
    console.log('All tokens removed');
};

const getToken = () => {
    let token = localStorage.getItem('token');
    return token;
}

const tokenExpired = () => {
    let token = localStorage.getItem('token');
    if (token) {
        let result = isJwtExpired(token)
        return result;
    }
    else {
        return true;
    }
}

export {
    auth,
    signInWithGoogle,
    logout,
    getToken,
    tokenExpired
};