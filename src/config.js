const dev = {
    PATH_BASE: 'http://127.0.0.1:8080',
    GOOGLE_API_KEY: 'AIzaSyAi2YG0yEOJ00sLKM63Vbxfpdk_SqL7UvI'
}
//this should be taken from firebase
const prd = {
    PATH_BASE: 'https://places-api-dot-ptprojectsweb.ew.r.appspot.com',
    GOOGLE_API_KEY: 'AIzaSyBxY4oT4SZd5r-nZiM1eFFnUCcC3UxgYr4'
}

export const config=prd;
//export const config = process.env.NODE_ENV === 'development' ? dev : prd;
