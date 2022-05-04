import ENV from '../config.js'
const API_HOST = ENV.api_host
console.log('Current environment:', ENV.env)



// Send a request to check if a user is logged in through the session cookie
export  const  getBookingsforBike = (id, app) => {
    const url = `${API_HOST}/bookBike/${id}`;
    
    console.log("=API host is " + API_HOST)
    
    var returnPromise = null

    returnPromise = fetch(url)
    .then(res => {
        if (res.status === 200) {
            console.log("200 response")
            console.log("res is " + res)
            return res.json();
        }
    })
    .catch(error => {
        console.log(error);
    });
    return returnPromise
};


// Send a request to check if a user is logged in through the session cookie
export  const  getBookingsforUser = (id, app) => {
    const url = `${API_HOST}/bookBikeUser/${id}`;
    
    console.log("=API host is " + API_HOST)
    
    var returnPromise = null

    returnPromise = fetch(url)
    .then(res => {
        if (res.status === 200) {
            console.log("200 response")
            console.log("res is " + res)
            return res.json();
        }
    })
    .catch(error => {
        console.log(error);
    });
    return returnPromise
};





export const postBooking = (loginComp, app) => {
    const url = `${API_HOST}/bookBike`;

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(loginComp),
        headers: {
            Accept: "application/json, text/plain, text/html, */*",
            "Content-Type": "application/json"
        }
    });

    return fetch(request)
    
};


