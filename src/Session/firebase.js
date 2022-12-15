import { initializeApp } from "firebase/app";
import { isJwtExpired } from 'jwt-check-expiration';


import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";

const devfirebaseConfig = {
    apiKey: "AIzaSyBJUQlokv0c-P4-FSei_k7VWuOV0GLgXcg",
    authDomain: "ptplacesdev.firebaseapp.com",
    projectId: "ptplacesdev",
    storageBucket: "ptplacesdev.appspot.com",
    messagingSenderId: "664443768445",
    appId: "1:664443768445:web:8df4bae69a6a6f77802b14"
};

const prodfirebaseConfig = {
    apiKey: "AIzaSyAKD7AagdCuXkEtc_IG8MQGwOfhiqLZohw",
    authDomain: "ptlinksprod.firebaseapp.com",
    projectId: "ptlinksprod",
    storageBucket: "ptlinksprod.appspot.com",
    messagingSenderId: "488456392633",
    appId: "1:488456392633:web:f2b83882cb3b34a3a9b068"
};

const configName = process.env.NODE_ENV === 'development' ? devfirebaseConfig : prodfirebaseConfig;
const app = initializeApp(configName);
const auth = getAuth(app)


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
        localStorage.setItem("token", res.user.accessToken);

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
    localStorage.removeItem("token")
    console.log('token removed')
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