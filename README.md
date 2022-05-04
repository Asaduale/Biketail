# team40
Deployed app link: `https://fierce-badlands-96152.herokuapp.com/`

# Phase 2 README:
- Note 1: If something does not work on the first render, please try refreshing it.
- Note 2: Please populate all the fields when creating an listing/account/etc. (including the calendar dates in the rental listing). Most text fields must be at least length of 4.
- *Note 3:* Even though the code in the main branch (except for client/build directory) matches the code in the dev branch, the ratings work properly on dev and somehow get added twice on main. This probably happened when we had to push the build folder for the heroku deploy to work. *Please consider in dev when running the app locally.*
There are two types of users for this app: regular users and admin users.
* Regular users can sign up, log in, create listings for sale and rental bikes, purchase an on sale bike, rent a rental bike, rate a bike they have purchased, rate rental bikes, save bikes, view listings, saved, renter portal, and purchase history pages, and use the searchbar to filter out the bikes.
* Admin users can do everything that the regular users can in addition to banning users and bikes. Banned users will not be able to log in until ban removed, and banned bikes will be hidden on the buy and rent pages. Admin users cannot make their account through signup and must do it through server calls (more detail on this later).
* The rental portal portal does not work since we didnt have time to connect it well in phase 2. The UI curently shows the bikes for rent but even though the API calls are working for the rented bikes 
we didnt have the time to connect it to the front end.
* The filter does not work since it we didnt have time to implement that either.
* The the sales bikes and rental bike listings are connected to the mongodb database and work well.

## Users that are already created:
1. email: user@user.com, password: user, name: user
2. email: user2@user.com, password: user2, name: User2
3. (admin user) email: admin@admin.com, password: admin, name: Admin


## Setting up the app locally:
From the root directory of this file:
1. `mkdir mongo-data`
2. `mongod --dbpath mongo-data`
3. Open another terminal window and from the root directory of this app:
5. `npm install`
6. `cd client`
7. `npm install`
8. For local run, open the file client/src/config.js and change the api_host for prod to `'http://localhost:5000'` (line 3).
9. Save above change.
10. `npm run build`
11. `cd ..`
12. `node server.js`
Now the app is running locally and can be accessed through `http://localhost:5000`



## Instructions for signing up and logging in:
Only regular users can sign up through the website by navigating to sign up in the navbar, filling their info, and clicking signup.
Both regular and admin users can log into the website by navigating to login in the navbar, entering email and password, and clicking login.


## Instructions on creating an admin user:
While the app is running, make a POST call to either `localhost:5000/api/admins` for local or `https://fierce-badlands-96152.herokuapp.com/api/admins` for deplouyed envs (note: put the link of the deployed app instead of localhost:5000) with the body:
`{
    "name": "Admin",
    "email": "admin@admin.com",
    "password": "admin"
}`


## Admin feature flow:


Biketail is a platform for buying, selling and renting bikes. The platform is designed to specifically cater to biking enthusiats and newbies.
In the application there are two different types of users. There are regular users and there are admins. Regular users and admins can add their biking merchandise, sell, and rent it whereas admins in addition can ban users from logging into the platform, and can also ban specific bikes that are for rent and sale. If you log in as an admin you will be able to see the account icon on the top right of the screen. When you click on it you will be shown two extra entries for banning specific users and bike entries from the platform for breach of policy reasons excetra. The `site users` entry is used for blocking users whereas the `site bikes` entry is use for banning bikes. There is a search bar in both pages for searching for specific entries on enter. Banned users will not be able to login and banned bikes will not show up on buy and rent pages.

### User flows for using this application

In order to rent a bike you need to click on the rent tab on the top left of the window. The cards containing bikes are different in the rental section than the buying section, the buying section contains details about the full price of the bike where as the rental section allows users to pay per day for different bikes. Upon clicking the cards of the rental section you will be able to see more info about the bike such as the wheel size, brakes, color, a carousel of pictures about the bike and available times for the bike. You will also be able to see the owners contact info, reviews about the bike, and a map showing the pickup location of the bike. Using this info you will be able to decide wheather you would like to move ahead with the rental of the bike of not.

### Instructions for buying a bike flow

The homepage of the web app is for buying buy default. A user can navigate to the bikes on sale through either clicking on **Biketail** or **Buy** in the navbar. Once there,the user will be able to see a list of all the bikes as cards with a summary of each bike's spec and a photo. The user can then click on each of these cards to view their individual page. Once on the individual page, there will be an image list of the bike, a card with the bike's main info on the right with some action buttons, and additional info below in addition to a static map. If logged in, user can view a **purchase** button to buy bikes if the bikes is listed by other users. They can increase the number of bikes they want to buy (default one) and then click the purchase button). Once that button is clicked, the bike will be purchased and go into the user's purchased bikes list page. In the purchased history page, users can view all the bikes they have purchased and also search for them using the searchbar and hitting enter. After a user has purchased a bike, the number of that bike they have purchased will be subtracted from the bike's stocking and updated.

### Instructions for editing a bike
Sellers can add stockings to their sale bike listings through the corresponding bike's page by choosing the stock number to add and clicking the add button beside it.

### Instructions for making a listing

Ensure that you are logged in (no 401 error in console). The listing page opens with an option to either sell or rent out a bike. Upon selecting an option, users are presented with a 2-part form to input 1) bike and 2) transaction information. For sale bikes, sellers can add the initial stockings they have for sale. The first bike details portion is identical between selling and renting, since the description of the bike features similar attributes e.g. bike age, wheel size. Note that there is an area for image uploads, although this feature is not currently functional. Most fields are dynamic, but some are still not functional e.g. location. Please fill in all the text fields, including calendar (min length 4 for text input fields).

The transaction information section differs between selling and renting as follows:

#### Selling details

The user can input their desired listing price, then select one of 3 selling options. Each option is associated with further details that are revealed upon selection.  

1. Buyer pickup 
    1. Users input pickup location and payment method, currently set as options between e-transfer, cash, and other
2. Ship to buyer
    1. Users will organize shipping the bike to buyers, with a dummy link to Biketail’s shipping hub for guidance
    2. Users can set how much buyers will pay for shipping
3. Biketail pickup
    1. There’ll be an option to let Biketail handle shipping for a fixed fee
    2. Users can input a pickup date and time

#### Renting out details

Renting details are more straightforward, made up of the following:

1. Availability for start and end dates
2. Pickup and return location
3. Price per day
4. Other details (free text field)

#### Submitting the listing

Users then press “Submit”, adding the new bike to a global state array; in the future, this will be a POST request to a database. Users are then redirected to a ‘My Listings’ page, where their new listing will be shown. The listing is also shown on the appropriate buy/rent page. 

#### Managing listings

Users can head to the ‘Account’ page to view their information and find links to ‘My Listings’ and a ‘Seller Portal’. The listings page is the same page linked to after upload submission and is also accessible from the nav bar, while the portal offers users a way to manage their bikes available for rent. The latter is still largely conceptual and will see significant change e.g. messaging features between sellers and renters, or removing bikes that are no longer available for rent.

### Instructions for viewing user's own listings
Once logged in, the user can navigate to the account menu in the navbar (account icon on the top right next to the heart icon). There will be a dropdown menu from where the user can click **My Listings**. User will then be sent to the listings page which shows all the bikes listed by the current user, all in one place. User can toggle between rental and on sale bike to view the bikes accordingly.

### Instructions for search bar
Users can use the searchbar in the buy page, rent page, and purchased bikes page to filter out the bikes on those pages by either (part or full) name, model, or brand. Admins can also use searchbars and admin user pages (by user ID, name, email) and user bike pages.


### Logging out:
When logged in, user can log out by clicking the account icon in the navbar and clicking logout in the dropdown menu.


### Instructions for adding a rating:
(This park somehow works best on the dev branch even though the code is identical to the main branch except for the client/build directory that we had to push for deploy to work)
Users can add ratings up to once on a sale bike that they have purchased by navigating to that bike's page, scrolling down until seeing a rating form and fill in all the fields (rating stars, heading, comments) and clicking post to add their rating. They will then be redirected to the bike page again and will be able to view their comment in the rating section (if doesn't work, please refresh). The bike average rating and total number of ratings will also be updated.
Users can also add ratings to the rental bikes up to once in the same manner.


### Instructions for saving a bike flow

Once logged in, user can save/unsave a bike whether on sale or rental, and all the bikes will be viewed in the `/saved` link which can be accessed on the heart-shaped navbar button on the top right of the navbar (user must be logged in to see it). On the user's saved bike's pages, there is a toggle for on sale vs rental saved bikes. It is on the sale bikes by default, but the user can toggle between them to see their saved bikes that were on sale or a rental. If a user unsaves a bike from within the saved bike window, the bike will be removed from there since it is no longer saved. Some of the bikes are already saved for user/user2 thourh the global states on `app.js` so it is available there. User can also save/unsave a bike when on a bike's individual page (which is accessed through the bike cards). If saving/unsaving does not work, please consider refreshing and ensuring that you are logged in.



### Server API calls Overview

The server api calls are there for authentication for users, For user authentication there are the following API calls:
POST /users/signup: where new users are added to the database as users for this app. For the singup call needs username, passcode and name. The new user is retuned.
- POST /users/login: where users can login using email and passcode. 
- GET /users/logout: the user here logs out 
- GET /users/check-session: This gets the current session bade on the cookies.
- POST /api/users: This adds the email name and passcode to create a regular user.
- POST /api/admins/: This adds the email name and passcode to create a admin user.
- POST /bikeForSale: This adds a new bike for sale and required bike information as well as the user that listed the bike's session info
- GET /bikesForSale: This gets all the bikes for sale and does not require any outputs, its returns a list of sales bike schema objects.
- GET /bikesForRent/:id : This requires the id of the bike and returns the bike object for rent
- GET /bikesForRent/: This gets all the bikes for rent in a list array of object bikesforrent
- POST /Bikesforrent/: This adds a new bike for rent and required bike information as well as the user that listed the bike's session info
- POST /bookBike/: Passes a start and end data of the bike to book it by representing the renters start and end availability posting.
- GET /bookBike/:id : Gets a booking given the id 
- DELETE /bookBike/:id : Deletes a booking from bookings given a id
- POST /api/toggleUserRoles, /api/toggledBikeState bans/unbans users/bike given their user/bike id (must be authenticated as admin)
- POST /api/toggleBikeSave: saves unsaves bike given id
- POST /api/ratings posts rating given bike and user id and rating content
- GET /api/ratingsForRentalBike/:bike_id: get ratings of a rental bike by bike_id
- GET /api/ratingsForSaleBike/:bike_id: get ratings of a sale bike by bike_id
- GET /api/ratings/:user_id/:bike_id: get ratings of a user (user_id) of a rental bike
- GET /api/saleRating/:user_id/:bike_id: get ratings of a user (user_id) of a sale bike

