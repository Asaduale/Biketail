import React from "react";
import "./App.css";
import "./components/js/Home";
import Home from "./components/js/Home";
import Seller from "./components/js/Seller/Seller-checkout";
import Renter from "./components/js/Renter";
import Navbar from "./components/js/Navbar";
import Login from "./components/js/Login";
import Signup from "./components/js/Signup";
import Logout from "./components/js/Logout";
import Saved from "./components/js/Saved";
import Account from "./components/js/Account";
import Listings from "./components/js/Listings";
import RentalBikePage from "./components/js/RentalBikePage";
import SaleBikePage from "./components/js/SaleBikePage";
// import Chat from "./components/js/chat/Chat.js"
import './App.css';
import './components/js/Home';
import Purchase from "./components/js/Purchase";
import Portal from './components/js/Seller/Portal';
import AdminBikeListings from './components/js/AdminBikeListings';
import AdminUserListings from './components/js/AdminUserListings';
import RentedBikes from './components/js/RentedBikes';
import { getAllListings } from "./actions/sale";
import { getAllListingsRent } from "./actions/rent";


import { Switch, Route, BrowserRouter } from "react-router-dom";

import { checkSession } from './actions/user';

export default class App extends React.Component {
  constructor() {
    super();

    //***A lot of this code in the future will be pulled from a database***
    this.setAppState = this.setAppState.bind(this);
  }
  state = {
    currentUser: null,
    currentEntireUser: null,
    currentUserName: null,
    currentUserRole: null,
    currentUserID: null,
    user: {
      uid: -1,
      is_admin: false,
      banned: false,
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      saved_rental_bikes: [],
      saved_sale_bikes: [],
      curent_rentals: [],
      purchased_bikes: []
  },
    bikes_for_sale: [],
    bikes_for_rent: [],
  };
  componentDidMount() {
    checkSession(this); // sees if a user is logged in
    getAllListings(this);

    getAllListingsRent(this);
  }
  setAppState(state) {
    this.setState(state);
  }

  render() {
    const { currentUser, currentUserRole } = this.state;
    const app_defaults = {
      setAppState: this.setAppState,
    };
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar {...app_defaults} appState={this.state} app={this} history={this.history} currentUserRole={currentUserRole}/>
          <Switch>
            <Route exact path='/' render={ props => <Home {...props} {...app_defaults} appState={this.state} app={this}/>}/>
            <Route exact path='/buy' render={ props => <Home {...props} {...app_defaults} appState={this.state} app={this}/>}/>
            <Route exact path='/buy/:search' render={ props => <Home {...props} {...app_defaults} appState={this.state} app={this}/>}/>
            <Route exact path='/post-listing' render={props => (this.state.currentUser ? <Seller {...props} {...app_defaults} appState={this.state} app={this}/> : <Login {...props} {...app_defaults} appState={this.state}/>)}/>
            <Route exact path='/listings' render={ props => <Listings {...props} {...app_defaults} appState={this.state}/>}/>
            <Route exact path='/portal' render={props => <Portal {...props} {...app_defaults} appState={this.state}/>}/>
            <Route exact path='/rent' render={ props => <Renter {...props} {...app_defaults} appState={this.state} app={this}/>}/>
            <Route exact path='/rent/:search' render={ props => <Renter {...props} {...app_defaults} appState={this.state} app={this}/>}/>
            <Route exact path='/rentedBikes' render={props => <RentedBikes {...props} {...app_defaults} appState={this.state}/>}/>
            <Route exact path='/rentedBikes/:search' render={props => <RentedBikes {...props} {...app_defaults} appState={this.state}/>}/>
            <Route exact path='/login' render={props => (!currentUser ? <Login {...props} {...app_defaults} app={this} appState={this.state} /> : <Account {...props} {...app_defaults} appState={this.state}/>)}/>
            <Route exact path='/signup' render={props => <Signup {...props} {...app_defaults} app={this} appState={this.state}/>}/>
            <Route exact path='/adminUsersList'  render={props => currentUserRole == 1 ? <AdminUserListings {...props} {...app_defaults} appState={this.state} app={this}/> : <div>404 Not found</div>}/>
            <Route exact path='/adminUsersList/:search'  render={props => currentUserRole == 1 ? <AdminUserListings {...props} {...app_defaults} appState={this.state} app={this}/> : <div>404 Not found</div>}/>
            <Route exact path='/adminBikesList' render={props => currentUserRole == 1 ? <AdminBikeListings {...props} {...app_defaults} appState={this.state} app={this}/> : <div>404 Not found</div>}/>
            <Route exact path='/adminBikesList/:search' render={props => currentUserRole == 1 ? <AdminBikeListings {...props} {...app_defaults} appState={this.state} app={this}/> : <div>404 Not found</div>}/>
            <Route exact path='/saved' render={props => (this.state.currentUser ? <Saved {...props} {...app_defaults} appState={this.state}/> : <Login {...props} {...app_defaults} appState={this.state}/>)}/>
            <Route exact path='/listings' render={props => (this.state.currentUser ? <Listings {...props} {...app_defaults} appState={this.state}/> : <Login {...props} {...app_defaults} appState={this.state}/>)}/>
            <Route exact path='/account' render={props => <Account {...props} {...app_defaults} appState={this.state}/>}/>
            <Route exact path='/logout' render={props => <Logout {...props} {...app_defaults} app={this} appState={this.state}/>}/>
            <Route exact path='/buy_bike/:id' render={props => <SaleBikePage {...props} {...app_defaults} appState={this.state} app={this}/>}/>
            <Route exact path='/saved/buy_bike/:id' render={props => <SaleBikePage {...props} {...app_defaults} appState={this.state} app={this}/>}/>
            <Route exact path='/login/buy_bike/:id' render={props => <SaleBikePage {...props} {...app_defaults} appState={this.state} app={this}/>}/>
            <Route exact path='/listings/buy_bike/:id' render={props => <SaleBikePage {...props} {...app_defaults} appState={this.state} app={this}/>}/>
            <Route exact path='/buy/buy_bike/:id' render={props => <SaleBikePage {...props} {...app_defaults} appState={this.state} app={this}/>}/>
            <Route exact path='/rent_bike/:id' render={props => <RentalBikePage {...props} {...app_defaults} app={this} appState={this.state}/>}/>
            <Route exact path='/rent/rent_bike/:id' render={props => <RentalBikePage {...props} {...app_defaults} app={this} appState={this.state}/>}/>
            <Route exact path='/saved/rent_bike/:id' render={props => <RentalBikePage {...props} {...app_defaults} app={this} appState={this.state}/>}/>
            <Route exact path='/listings/rent_bike/:id' render={props => <RentalBikePage {...props} {...app_defaults} app={this} appState={this.state}/>}/>
            {/* <Route exact path='/chat' render={props => (<Chat {...props} {...app_defaults} appState={this.state}/>)}/> */}
            <Route exact path='/purchase-receipt' render={() => <h1>Purchased</h1>}/>
            <Route exact path='/purchase-history' render={props => <Purchase {...props} {...app_defaults} app={this} appState={this.state}/>}/>
            <Route exact path='/purchase-history/:search' render={props => <Purchase {...props} {...app_defaults} app={this} appState={this.state}/>}/>
            <Route render={() => <div>404 Not found</div>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
