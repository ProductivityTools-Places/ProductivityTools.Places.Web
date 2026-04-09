const dev = {
    PATH_BASE: 'http://127.0.0.1:8080',
    GOOGLE_API_KEY: 'AIzaSyALTp_8O1-z9UV-5hvXEjCdzpEWkTQZJJY'
}

const prd = {
    PATH_BASE: 'https://places-api-dot-ptprojectsweb.ew.r.appspot.com',
    GOOGLE_API_KEY: 'AIzaSyALTp_8O1-z9UV-5hvXEjCdzpEWkTQZJJY'
}

//export const config=prd;
export const config = process.env.NODE_ENV === 'development' ? dev : prd;
