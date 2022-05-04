import ENV from '../config.js'
const API_HOST = ENV.api_host
console.log('Current environment:', ENV.env)

export const postRating = async (rating, heading, comment, bike_id, bike_type, app) => {
    const req_body = {
        rating: rating,
        heading: heading,
        comment: comment,
        bike_id: bike_id,
        bike_type: bike_type
    }
    console.log('######');
    console.log(req_body);
    const request = new Request(`${API_HOST}/api/ratings`, {
        method: 'post',
        body: JSON.stringify(req_body),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    await fetch(request).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        if (bike_type === 'sale') {
            app.setState({bikes_for_sale: json.all_sale_bikes});
        } else if (bike_type === 'rental') {
            app.setState({bikes_for_rent: json.all_rental_bikes});
        }
    }).catch(error => {
        console.log(error)
    });
}


export const checkUserSaleRating = (user_id, bike_id, comp) => {

    const url = `${API_HOST}/api/saleRating/${user_id}/${bike_id}`
    fetch(url).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        comp.setState({canRate: json.ratingCount === 0});
    }).catch(error => {
        console.log(error)
    });
}


export const checkUserRentalRating = (user_id, bike_id) => {

    const url = `${API_HOST}/api/ratings/${user_id}/${bike_id}`
    fetch(url).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        return json.ratingCount;
    }).catch(error => {
        console.log(error)
    });
}


export const getSaleBikeRatings = (bike_id, comp) => {
    const url = `${API_HOST}/api/ratingsForSaleBike/${bike_id}`;
    fetch(url).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        comp.setState({bikeRatings: json.bikeRatings});
    });
}


export const getRentalBikeRatings = (bike_id, comp) => {
    const url = `${API_HOST}/api/ratingsForRentalBike/${bike_id}`;
    fetch(url).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    }).then(json => {
        comp.setState({bikeRatings: json.bikeRatings});
    });
}
