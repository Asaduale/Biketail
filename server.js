"user strict";
const config = require('./config');
const { env, USE_TEST_USER, TEST_USER_ID, TEST_USER_EMAIL } = config;

const path = require('path')

const express = require('express');
// starting the express server
const app = express();

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }
console.log(env);
// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const session = require('express-session');
const MongoStore = require('connect-mongo'); // for prod db

const { User } = require("./models/user");
const { bikesForSale } = require("./models/sale");
const { bikesForRent } = require("./models/rental");
const { bookings } = require("./models/booking");



const { Rating } = require("./models/rating");
const { Purchase } = require('./models/purchase');
const { SaleRating } = require('./models/sale_rating')

const { ObjectID } = require("mongodb");


// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'ddrj9e9bc',
    api_key: '759589372776618',
    api_secret: 'aAD4IHNaDA7WxH4z-4nOGoeKLhE'
});



// if mongo disconnects
function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === 'MongoNetworkError';
}

// middleware for checking mongo connection for routes that need it
const mongoChecker = (req, res, next) => {
    if (mongoose.connection.readyState != 1) {
        console.log('Issue with mongoose connection');
        res.status(500).send('Internal server error');
        return;
    } else {
        next();
    }
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (env !== 'production' && USE_TEST_USER)
        req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user || (user && user.role == -1)) {
                return Promise.reject();
            }
            req.user = user;
            next();
        }).catch((error) => {
            res.status(401).send('Unauthorized');
        })
    } else {
        res.status(401).send('Unauthorized');
    }
}

const authenticateAdmin = (req, res, next) => {
    if (env !== 'production' && USE_TEST_USER)
        req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user || (user && user.role != 1)) {
                return Promise.reject();
            }
            req.user = user;
            next();
        }).catch((error) => {
            res.status(401).send('Unauthorized Admin');
        })
    } else {
        res.status(401).send('Unauthorized Admin');
    }
}

// Create session and cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "csc309 winter 2022 team40", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store sessions on prod database
        store: env === 'production' ? MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/BiketailAPI'
        }) : null
    })
);

app.post('/users/signup', mongoChecker, async (req, res) => {
    //console.log(req.body);
    console.log("*****")
    User.findByEmail(req.body.email).then(async () => {
        console.log("------")
        // Create a new user
        const user = new User({
            email: req.body.email,
            password: req.body.password1,
            name: req.body.name
        })
        console.log(user)
        // Save the user
        console.log("BEFORE")
        const newUser = await user.save();
        console.log("DONE")
        res.status(200).send(newUser);
    }).catch(error => {
        console.log("EXISTS")
        console.log(error)
        res.status(400).send('Email is already in use.');
    });
});

app.post('/users/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    User.findByEmailPassword(email, password)
        .then(user => {
            if (user && user.role != -1) {
                console.log(user);
                // Add the user's id to the session.
                // We can check later if this exists to ensure we are logged in.
                req.session.user = user._id;
                req.session.email = user.email; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
                req.session.role = user.role;
                req.session.username = user.name;
                req.session.entireUser = user;
                res.send({ currentUser: user.email, currentUserRole: user.role, currentUserID: user._id, currentUserName: user.name, currentEntireUser: user});
            }
        })
        .catch(error => {
            res.status(400).send();
        });
});


app.get('/users/logout', (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send();
        }
    });
});

app.get('/users/check-session', (req, res) => {
    if (env !== 'production' && USE_TEST_USER) {
        req.session.user = TEST_USER_ID;
        req.session.email = TEST_USER_EMAIL;
        res.send({ currentUser: TEST_USER_EMAIL })
        return;
    }

    if (req.session.user) {
        res.send({ currentUser: req.session.email, currentUserRole: req.session.role, currentUserID: req.session.user, currentUserName: req.session.username, currentEntireUser: req.session.entireUser });
    } else {
        res.status(401).send();
    }
});


/****************************** API ROUTES ******************************/
// User API Route
app.post('/api/users', mongoChecker, async (req, res) => {
    console.log(req.body)
    // Create a new user
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    })
    try {
        // Save the user
        const newUser = await user.save()
        console.log(newUser.saved_rental_bikes)
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})


app.post('/api/admins', mongoChecker, async (req, res) => {
    console.log(req.body)
    // Create a new user
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: 1,
    })
    try {
        // Save the user
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})



app.post('/bikesForSale', mongoChecker, async (req, res) => {
    console.log("testing")

    const bikeForSale = new bikesForSale({
        name: req.body.name,
        stock: parseInt(req.body.stock), 
        model:  req.body.model,
        banned: req.body.banned,
        condition: req.body.condition,
        color: req.body.color,
        type: req.body.type,
        material: req.body.material,
        frame_size: req.body.frame_size,
        wheel_size: req.body.wheel_size,
        suspension: req.body.suspension,
        brake_type: req.body.brake_type,
        age: req.body.age,
        brand: req.body.brand,
        images: req.body.images,
        selling_method: req.body.selling_method,
        transaction_details: req.body.transaction_details,
        price: req.body.price,
        location: req.body.location,
        listed_by: req.session.user,
        information: req.body.information ,
        avg_ratings: req.body.avg_ratings,
        ratings: req.body.ratings

    })

    console.log("New bike to add is " + bikeForSale)
    try {      
        const newBikeForSale = await bikeForSale.save()
        const all = await bikesForSale.getAll();
        res.send({new_bike: newBikeForSale, all_bikes: all});
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }

    
})


app.get('/bikesForSale', mongoChecker, async (req, res) => {
    console.log("testing")

    bikesForSale.getAll()
        .then(bikes => {
            console.log("Bikes are " + bikes)
            res.send(bikes);
        })
        .catch(error => {
            res.status(400).send();
        });
})




app.get('/bikesForRent/:id', mongoChecker, async (req, res) => {
    console.log("testing")

    var id = req.params['id']

    bikesForRent.findById(id)
        .then(bike => {
            console.log("Bikes are " + bike)
            res.send(bike);
        })
        .catch(error => {
            res.status(400).send();
        });
})



app.get('/bikesForRent', mongoChecker, async (req, res) => {
    console.log("testing")

    bikesForRent.getAll()
        .then(bikes => {
            console.log("Bikes are " + bikes)
            res.send(bikes);
        })
        .catch(error => {
            res.status(400).send();
        });
})



app.patch('/bikesForRent/:id/:book_id', mongoChecker, async (req, res) => {
    console.log("testing, patch request received")

    var id = req.params['id']
	var book_id = req.params['book_id']

    try {
        const bookings = await bikesForRent.find({ "_id": id, "bookings._id": book_id}, {"bookings.$": 1,"_id": book_id })	
        console.log("testing, patch request received")

        await bikesForRent.updateOne({
            '_id': id
            }, {
            $push: { "bookings": { _id: book_id, endDate: req.body.endDate, startDate: req.body.startDate, bookedBy: req.body.bookedBy, bike: req.body.bike} }
        });


        const bike = await bikesForRent.findById(id);
        res.status(200).send(bike)
    }
    catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})



app.post('/bikesForRent', mongoChecker, authenticate, async (req, res) => {
    console.log("testing")
    // console.log("req.session.user " + req.session.user)
    // console.log("req is " + JSON.stringify(req))

    const bikeForRent = new bikesForRent({
        status: req.body.status,
        name: req.body.name, 
        model:  req.body.model,
        banned: req.body.banned,
        condition: req.body.condition,
        color: req.body.color,
        type: req.body.type,
        material: req.body.material,
        frame_size: req.body.frame_size,
        wheel_size: req.body.wheel_size,
        suspension: req.body.suspension,
        brake_type: req.body.brake_type,
        age: req.body.age,
        brand: req.body.brand,
        images: req.body.images,
        price_by_day: req.body.price_by_day,
        available: req.body.available,
        days: req.body.days,
        location: req.body.location,
        listed_by: req.session.user,
        information: req.body.information,
        ratings: req.body.ratings,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        bookings: [],
        avg_ratings: req.body.avg_ratings,
        pickup_details: req.body.pickup_details
    })

    console.log("New bike to add is " + bikeForRent)
    try {      
        const newBikeForRent = await bikeForRent.save();
        const all = await bikesForRent.getAll();
        res.send({new_bike: newBikeForRent, all_bikes: all});
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }

    
})







app.post('/bookBike', mongoChecker, async (req, res) => {
    console.log("testing")

    const booking = new bookings({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        bookedBy: req.body.bookedBy,
        bike: req.body.bike
    })

    console.log("New booking to add is " + booking)
    try {      
        const newBooking = await booking.save()
        console.log("Added the booking newBooking is " + newBooking)
        res.status(200).send({newBooking: newBooking})
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})


app.get('/bookBike/:id', mongoChecker, async (req, res) => {
    try {
        console.log("reached get statement")
        const id = req.params.id;
        const books = await bookings.find({bike: id});
        console.log('########')
        console.log(books);
        res.status(200).send({bookings: books});
    } catch(error) {
        res.status(400).send('Bad Request');
    }
})



app.get('/bookBikeUser/:id', mongoChecker, async (req, res) => {
    try {
        console.log("reached get statement")
        const id = req.params.id;
        const books = await bookings.find({bookedBy: id});
        console.log('########')
        console.log(books);
        res.status(200).send({bookings: books});
    } catch(error) {
        res.status(400).send('Bad Request');
    }
})


app.delete('/bookBike/:id', mongoChecker, async (req, res) => {
    try {
        console.log("reached get statement")
        const id = req.params.id;
        
        await bookings.updateOne({
            'bookedBy': id
            }, {
            $pull: { "bookedBy": { bookedBy: id } }
        });

        const books = await bookings.find();

        console.log('########')
        console.log("books are " + books);
        res.status(200).send({bookings: books});
    } catch(error) {
        res.status(400).send('Bad Request');
    }
})



// gets all non admin users for admin pages (to add/remove user bans)
app.get('/api/users', mongoChecker, authenticateAdmin, async(req, res) => {
    try {
        const all = await User.find({role: {$lte: 0}});
        console.log(all);
        res.send(all)
    } catch(error) {
        res.status(400).send('Bad Request')
    }
})


app.post('/api/purchaseBike/:bike_id', mongoChecker, authenticate, async (req, res) => {
    try {
        const bike_id = req.params.bike_id;
        const bike = await bikesForSale.findById(bike_id);
        const id = req.session.user;
        const user = await User.findById(id);
        const quantity = parseInt(req.body.quantity);
        if (bike.stock - quantity >= 0) {
            bike.stock = bike.stock - quantity;
            if (!user.purchased_bikes.includes(bike._id)) {
                user.purchased_bikes.push(bike._id);
            }
            const purchase_record = new Purchase({
                buyer: user._id,
                bike: bike._id,
                quantity: quantity,
            });
            const new_purchase = await purchase_record.save();
            user.purchase_history.push(new_purchase._id);
            await bike.save();
            const updated_user = await user.save();
            const all_bikes = await bikesForSale.getAll();
            res.send({all_sale_bikes: all_bikes, currentEntireUser: updated_user});
        } else {
            res.status(400).send('Bad Request: Bike is sold out!')
        }

    } catch(error) {
        res.status(400).send('Bad Request')
    }
})


app.post('/api/addSaleStock/:bike_id', mongoChecker, authenticate, async (req, res) => {
    try {
        console.log('asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf')
        const bike_id = req.params.bike_id;
        const bike = await bikesForSale.findById(bike_id);
        const id = req.session.user;
        if (bike.listed_by == id) {
            const stock = parseInt(req.body.stock);
            bike.stock = bike.stock + stock;
            await bike.save();
            const all_bikes = await bikesForSale.getAll();
            res.send({all_sale_bikes: all_bikes});
        } else {
            res.status(400).send('Bad Request: Only the seller gets to add stock.')
        }

    } catch(error) {
        res.status(400).send('Bad Request')
    }
})


app.get('/api/userNameById/:id', mongoChecker, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.send({userName: user.name});
    } catch(error) {
        res.status(400).send('Bad Request');
    }
})


app.post('/api/toggleUserRoles', mongoChecker, authenticateAdmin, async(req, res) => {
    try {
        const id = req.body._id;
        const user = await User.findById(id);
        if (user.role == -1) {
            user.role = 0;
        } else if (user.role == 0) {
            user.role = -1;
        }
        await user.save();
        console.log(user);
        res.send(user);
    } catch(error) {
        res.status(400).send('Bad Request');
    }
});


////////////
app.post('/api/toggleBikeSave', mongoChecker, authenticate, async(req, res) => {
    try {
        const bike_id = req.body.bike._id;
        const is_sale = req.body.sale;
        const is_rent = req.body.rent;
        const id = req.session.user;
        if (is_sale) {
            const bike = await bikesForSale.findById(bike_id);
            const user = await User.findById(id);
            if (bike.saved_by.includes(id)) {
                user.saved_sale_bikes.splice(user.saved_sale_bikes.indexOf(bike_id), 1);
                bike.saved_by.splice(bike.saved_by.indexOf(bike_id), 1);
            } else {
                user.saved_sale_bikes.push(bike_id);
                bike.saved_by.push(id);
            }
            await user.save();
            await bike.save();
            res.send({saved_bikes: user.saved_sale_bikes});
        } else if (is_rent) {
            const bike = await bikesForRent.findById(bike_id);
            const user = await User.findById(id);
            if (bike.saved_by.includes(id)) {
                user.saved_rental_bikes.splice(user.saved_rental_bikes.indexOf(bike_id), 1);
                bike.saved_by.splice(bike.saved_by.indexOf(bike_id), 1);
            } else {
                user.saved_rental_bikes.push(bike_id);
                bike.saved_by.push(id);
            }
            await user.save();
            await bike.save();
            res.send({saved_bikes: user.saved_rental_bikes});
        }
    } catch(error) {
        console.log(error);
        res.status(400).send('Bad Request');
    }
});


app.post('/api/toggledBikeState', mongoChecker, authenticateAdmin, async(req, res) => {
    try {
        const bike_id = req.body.bike._id;
        const bike_type = req.body.bike_type;
        if (bike_type === 'sale') {
            const bike = await bikesForSale.findById(bike_id);
            console.log(bike);
            console.log(bike.banned);
            bike.banned = !bike.banned;
            console.log(bike.banned);
            await bike.save();
            const all_bikes = await bikesForSale.getAll();
            res.send({bikes: all_bikes});
        } else if (bike_type === 'rental') {
            const bike = await bikesForRent.findById(bike_id);
            bike.banned = !bike.banned;
            await bike.save();
            const all_bikes = await bikesForRent.getAll();
            res.send({bikes: all_bikes});
        }
    } catch(error) {
        res.status(400).send('Bad Request');
    }
})



app.get('/api/getUserSavedSaleBikes', mongoChecker, authenticate, async(req, res) => {
    try {
        const user = await User.findById(req.session.user);
        res.send({saved_bikes: user.saved_sale_bikes})
    } catch(error) {
        res.status(400).send('Bad Request');
    }

})

app.get('/api/getUserSavedRentalBikes', mongoChecker, authenticate, async(req, res) => {
    try {
        const user = await User.findById(req.session.user);
        res.send({saved_bikes: user.saved_rental_bikes})
    } catch(error) {
        res.status(400).send('Bad Request');
    }

})


// Rating API Routes
app.post('/api/ratings', mongoChecker, authenticate, async(req, res) => {
    try {
        const bike_type = req.body.bike_type;
        const user_id = req.session.user;
        const rating_val = req.body.rating;
        const comment = req.body.comment;
        const heading =  req.body.heading;
        const bike_id = req.body.bike_id;
        if (bike_type === 'sale') {
            const rating = new SaleRating({
                user_id: user_id,
                rating: rating_val,
                comment: comment,
                heading: heading,
                sale_bike_id: bike_id
            });
            const ratingCount = await SaleRating.count({sale_bike_id: bike_id, user_id: user_id});
            if (ratingCount == 0) {
                const bike = await bikesForSale.findById(bike_id);
                const total_ratings = bike.ratings.length;
                const current_avg_rating = bike.avg_ratings;
                bike.avg_ratings = (current_avg_rating * total_ratings + rating_val) / (total_ratings + 1)
                const newRating = await rating.save();
                console.log('***************RATING');
                console.log(rating);
                bike.ratings.push(newRating._id);
                await bike.save();
            }
            const all_sale_bikes = await bikesForSale.getAll();
            res.send({all_sale_bikes: all_sale_bikes})
        } else if (bike_type === 'rental') {
            const rating = new Rating({
                user_id: user_id,
                rating: rating_val,
                comment: comment,
                heading: heading,
                rental_bike_id: bike_id
            });
            const ratingCount = await Rating.count({rental_bike_id: bike_id, user_id: user_id});
            if (ratingCount == 0) {
                const bike = await bikesForRent.findById(bike_id);
                const total_ratings = bike.ratings.length;
                const current_avg_rating = bike.avg_ratings;
                bike.avg_ratings = (current_avg_rating * total_ratings + rating_val) / (total_ratings + 1)
                const newRating = await rating.save()
                bike.ratings.push(newRating._id);
                await bike.save();
            }
            const all_rental_bikes = await bikesForRent.getAll();
            res.send({all_rental_bikes: all_rental_bikes})
        }
    } catch(error) {
        res.status(400).send('Bad Request')
    }
})

app.get('/api/ratings/:user_id/:bike_id', mongoChecker, authenticate, async(req, res) => {
    try {
        const user_id = req.params.user_id;
        const bike_id = req.params.bike_id;
        const ratingCount = await Rating.count({rental_bike_id: bike_id, user_id: user_id});
        res.send({ratingCount: ratingCount});
    } catch(error) {
        console.log(error);
    }
})


app.get('/api/saleRating/:user_id/:bike_id', mongoChecker, authenticate, async(req, res) => {
    try {
        const user_id = req.params.user_id;
        const bike_id = req.params.bike_id;
        const ratingCount = await SaleRating.count({sale_bike_id: bike_id, user_id: user_id});
        res.send({ratingCount: ratingCount});
    } catch(error) {
        console.log(error)
        res.status(400).send('Bad Request');
    }
});



app.get('/api/ratingsForSaleBike/:bike_id', mongoChecker, async (req, res) => {
    try {
        const bike_id = req.params.bike_id;
        const ratings = await SaleRating.find({sale_bike_id: bike_id});
        const func = (ratings) => {
            const promises = ratings.map(async (r) => {
                const n = await User.findById(r.user_id);
                return {
                    ...r._doc,
                    name: n.name,
                }
            });
            return Promise.all(promises);
        }
        const ratings_with_name = await func(ratings);
        res.send({bikeRatings: ratings_with_name});
    } catch(error) {
        console.log(error)
        res.status(400).send('Bad Request');
    }
});


app.get('/api/ratingsForRentalBike/:bike_id', mongoChecker, async (req, res) => {
    try {
        const bike_id = req.params.bike_id;
        const ratings = await Rating.find({rental_bike_id: bike_id});
        const func = (ratings) => {
            const promises = ratings.map(async (r) => {
                const n = await User.findById(r.user_id);
                return {
                    ...r._doc,
                    name: n.name,
                }
            });
            return Promise.all(promises);
        }
        const ratings_with_name = await func(ratings);
        res.send({bikeRatings: ratings_with_name});
    } catch(error) {
        console.log(error)
        res.status(400).send('Bad Request');
    }
})



// a POST route to *create* an image
app.post("/images", multipartMiddleware, (req, res) => {
    console.log("req is " + JSON.stringify(req))
    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {

            // Create a new image using the Image mongoose model
            var img = new Image({
                image_id: result.public_id, // image id on cloudinary server
                image_url: result.url, // image url on cloudinary server
                created_at: new Date(),
            });

            // Save image to the database
            img.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});

// a GET route to get all images
app.get("/images", (req, res) => {
    Image.find().then(
        images => {
            res.send({ images }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/// a DELETE route to remove an image by its id.
app.delete("/images/:imageId", (req, res) => {
    const imageId = req.params.imageId;

    // Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
    // on the cloudinary server
    cloudinary.uploader.destroy(imageId, function (result) {

        // Delete the image from the database
        Image.findOneAndRemove({ image_id: imageId })
            .then(img => {
                if (!img) {
                    res.status(404).send();
                } else {
                    res.send(img);
                }
            })
            .catch(error => {
                res.status(500).send(); // server error, could not delete.
            });
    });
});





app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ['/', '/login', '/buy', '/post-listing', '/listings', '/portal', '/rent', '/rentedBikes', '/login', '/signup', '/adminUsersList', '/adminBikesList', '/saved', '/listings', '/account', '/logout', '/purchase-receipt', '/buy_bike/:id', '/saved/buy_bike/:id', '/login/buy_bike/:id', '/listings/buy_bike/:id', '/buy/buy_bike/:id', '/rent/rent_bike/:id','/saved/rent_bike/:id', '/listings/rent_bike/:id', '/buy/:search', '/rent/:search', '/adminUsersList/:search', '/adminBikesList/:search', '/rentedBikes/:search', '/purchase-history', '/purchase-history/:search'];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
