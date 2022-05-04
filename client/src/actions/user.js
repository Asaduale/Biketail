import ENV from '../config.js'
const API_HOST = ENV.api_host
console.log('Current environment:', ENV.env)

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    console.log("Check on stuff")
    const url = `${API_HOST}/users/check-session`;
    if (!ENV.use_frontend_test_user) {
        fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser, currentUserRole: json.currentUserRole,  currentUserID: json.currentUserID, currentUserName: json.currentUserName, currentEntireUser: json.currentEntireUser});
            }
        })
        .catch(error => {
            console.log(error);
        });
    } else {
        app.setState({ currentUser: ENV.user });
    }
    
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    console.log("login called")
    console.log("api host is " + `${API_HOST}`)
    console.log(process.env.NODE_ENV)

    debugger;
    const request = new Request(`${API_HOST}/users/login`, {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, text/html, */*",
            "Content-Type": "application/json"
        }
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            console.log('11111');
            console.log(res);
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            console.log('22222');
            console.log(json);
            if (json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser, currentUserRole: json.currentUserRole, currentUserID: json.currentUserID, currentUserName: json.currentUserName, currentEntireUser: json.currentEntireUser });
            }
        }).catch(error => {
            console.log('333333');
            console.log(error);
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = `${API_HOST}/users/logout`;
    fetch(url).then(res => {
        app.setState({
            currentUser: null,
            currentUserRole: null,
            currentUserID: null
        });
    }).catch(error => {
        console.log(error);
    });
};

export const signup = (signupComp, app) => {
    console.log("testing whether I can be seen")
    const request = new Request(`${API_HOST}/users/signup`, {
        method: 'post',
        body: JSON.stringify(signupComp.state),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    // Send the request with fetch()
    fetch(request).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        if (json.currentUser !== undefined) {
            app.setState({ currentUser: json.currentUser });
        }
    }).catch(error => {
            console.log(error);
    });
}


export const getUserName = (user_id, where) => {
    const url = `${API_HOST}/api/userNameById/${user_id}`;
    fetch(url).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        if (json && json.userName !== undefined) {
            where.setState({lister_name: json.userName});
        }
    }).catch(error => {
            console.log(error);
    });
}


export const getUserSavedBikes = (comp, for_page, return_format=false) => {
    const url = `${API_HOST}/api/getUserSaved${for_page == 'buyer' ? 'Sale' : 'Rental'}Bikes`;
    fetch(url).then( res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        if (json) {
            if (return_format) {
                return json.saved_bikes;
            } else {
                comp.setState({saved_bikes: json.saved_bikes})
            }
            
        }
    })

}


export const toggleBikeSave = (bike, for_page, comp) => {
    const req_body = {
        bike: bike,
        sale: for_page === 'buyer',
        rent: for_page === 'renter'
    }
    const request = new Request(`${API_HOST}/api/toggleBikeSave`, {
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
        comp.setState({saved_bikes: json.saved_bikes});

    }).catch(error => {
        console.log(error)
    });
}

