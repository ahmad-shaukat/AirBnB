import Cookies from 'js-cookie'
// export async function csrfFetch(url, options = {}) {
    export const csrfFetch = async (url, options = {}) => {

    options.method = options.method || 'GET'
    options.headers = options.headers || {} // set options.headers to empty object if there are no headers
    // set options.headers to an empty object if there is no method



    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';  // if the options.method is not 'GET', then set the "Content-Type" header to
        // "application/json", and set the "XSRF-TOKEN" header to the value of the 
        // "XSRF-TOKEN" cookie
        options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
    }

    // call the default window's fetch with the url and the options passed in
    const res = await window.fetch(url, options);

    // if the response status code is 400 or above, then throw an error with the
    // error being the response
    if (res.status >= 400) {
        throw res};

    // if the response status code is under 400, then return the response to the
    // next promise chain
    return res;

}
// call this to get the "XSRF-TOKEN" cookie, should only be used in the development 
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore')
}

