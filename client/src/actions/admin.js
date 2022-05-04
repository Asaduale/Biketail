import ENV from '../config.js'
const API_HOST = ENV.api_host
console.log('Current environment:', ENV.env)

export const getUsers = (user_list) => {
    const url = `${API_HOST}/api/users`;
    fetch(url)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .then(json => {
        if (json) {
            user_list.setState({ all_users: json});
        }
    })
    .catch(error => {
        console.log(error);
    });
}

export const toggleUserRole = (user) => {
    const request = new Request(`${API_HOST}/api/toggleUserRoles`, {
        method: 'post',
        body: JSON.stringify(user),
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
        return;
    }).catch(error => {
        console.log(error)
    })
}