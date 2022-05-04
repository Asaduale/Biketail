import ENV from '../config.js'
const API_HOST = ENV.api_host
console.log('Current environment:', ENV.env)



// Send a request to check if a user is logged in through the session cookie
export  const  getAllListingsRent = (app) => {
    const url = `${API_HOST}/bikesForRent`;

    console.log("=API host is " + API_HOST)
    var myPromise = null;

    myPromise = fetch(url)
    .then(res => {
        if (res.status === 200) {
            console.log("200 response")
            console.log("res is " + res)
            return res.json();
        }
    })
    .then(data => {
        app.setState({bikes_for_rent: data});
    })
    .catch(error => {
        console.log(error);
    });
};


export const postListingForRent = (loginComp, app) => {
    const url = `${API_HOST}/bikesForRent`;

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(loginComp),
        headers: {
            Accept: "application/json, text/plain, text/html, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request).then(res => {
        if (res.status === 200) {
            console.log("200 response")
            console.log("res is " + res)
            return res.json();
        }
    }).then(json => {
        console.log("json stringify " + JSON.stringify(json))
        app.setState({bikes_for_rent: json.all_bikes});
        return json.new_bike;
    }).catch(error => {
        console.log(error);
    });
};



export const addBookingForBike = (id, bookingID, loginComp, app) => {
    const url = `${API_HOST}/bikesForRent/${id}/${bookingID}`;
    console.log("reached")
    const request = new Request(url, {
        method: "patch",
        body: JSON.stringify(loginComp),
        headers: {
            Accept: "application/json, text/plain, text/html, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request).then(res => {
        console.log("res is " + JSON.stringify(res))
        if (res.status === 200) {
            console.log("200 response")
            console.log("res is " + res)
            return res.json();
        }
    }).then(json => {
        console.log("json is " + JSON.stringify(json))
        app.setState({bikes_for_rent: json.all_bikes});
        return json.new_bike;
    }).catch(error => {
        console.log(error);
    });
};

// Send a request to check if a user is logged in through the session cookie
export const getListingsByID = (id, app) => {
    const url = `${API_HOST}/bikesForRent/${id}`;

    fetch(url)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .catch(error => {
        console.log(error);
    });
};


export const toggledRentalBikeState = (bike, comp) => {
    const req_body = {
        bike: bike,
        bike_type: 'rental'
    }
    const request = new Request(`${API_HOST}/api/toggledBikeState`, {
        method: 'post',
        body: JSON.stringify(req_body),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    fetch(request).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        comp.setState({bikes_for_rent: json.bikes});
    }).catch(error => {
        console.log(error);
    })
}