import ENV from '../config.js'
const API_HOST = ENV.api_host
console.log('Current environment:', ENV.env)




export const purchaseBike = (bike, quantity, container) => {
    const req_body = {
        quantity: quantity
    }
    const url = `${API_HOST}/api/purchaseBike/${bike._id}`;
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(req_body),
        headers: {
            Accept: "application/json, text/plain, text/html, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        console.log(json);
        container.setState({bikes_for_sale: json.all_sale_bikes, currentEntireUser: json.currentEntireUser});
    }).catch(error => {
        console.log(error);
    });
}


export const addSaleStock = (bike, stock, container) => {
    const req_body = {
        stock: stock
    }
    const url = `${API_HOST}/api/addSaleStock/${bike._id}`;
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(req_body),
        headers: {
            Accept: "application/json, text/plain, text/html, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        console.log(json);
        container.setState({bikes_for_sale: json.all_sale_bikes});
    }).catch(error => {
        console.log(error);
    });
}

