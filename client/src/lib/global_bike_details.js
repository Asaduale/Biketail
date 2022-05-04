import { modalUnstyledClasses } from '@mui/material';
import React from 'react';


// NOTE: bikes_for_sale and bikes_for_rent which will be the column names when creating tables on the bike databse
const bikes_for_sale_features = [
    'id', 'name', 'banned', 'model', 'condition', 'color', 'type', 'material', 'frame_size', 'wheel_size', 'suspension', 'brake_type', 'age', 'brand', 'images', 'selling_method', 'fulfillment_method', 'transaction_details', 'price', 'location', 'listed_by', 'saved_by', 'information'
]
// for admins can set user or bike to 'deprecated'

//const curr_user = [ uid: -1, is_admin: Bool, first_name: '', last_name: '', username: '', email: '', passowrd: '', saved_rental_bikes: [], saved_sale_bikes: [], curent_rentals: {bikeid: [start date, end date]}, ]

const user_features = [ 'uid', 'is_admin', 'banned', 'first_name', 'last_name', 'username', 'email', 'password', 'saved_rental_bikes', 'saved_sale_bikes', 'curent_rentals: {bikeid: [start date, end date]}' ]



const bikes_for_rent_features = [
    'id', 'name', 'banned' ,'model', 'condition', 'color', 'type', 'material', 'frame_size', 'wheel_size', 'suspension', 'brake_type', 'age', 'brand', 'images', 'selling_method', 'fulfillment_method', 'transaction_details', 'location', 'listed_by', 'saved_by', 'information',
    'available: bool', 'calendar_days [[start_date, end_date] for each rental window]', 'price_by_day', 'ratings: [{rating_num: comment}]'
]
// bikes for rent calendar_days: [[start_date, end_date] for each rental window] 

// id: Int, name: Str, model: Str, condition: Str, color: Str, type: Str, material: Str, frame_size: Str, wheel_size: float, suspension: Str, brake_type: Str, age: int, brand: String, images: [Img], fulfillment_method: Str, transaction_details: Str, price: float, sold_by: String, available: Bool, days: Int (0 by default), price_by_day: float

export const type_options = [
  'BMX',
  'Cruiser',
  'Electric',
  'Mountain',
  'Hybrid',
  'Road',
  'Folding',
  'Cargo',
  'Fat Tire',
  'Cyclecross',
  'Tandem',
  'Recumbent',
  'Kids',
  'Other'
];

export const color_options = [
  'green',
  'black',
  'white',
  'blue',
  'yellow',
  'pink',
  'gray',
  'orange',
  'brown',
  'silver',
  'red',
  'purple',
  'multicolor'
];

export const condition_options = [
  'Brand New',
  'Like New',
  'Very Good',
  'Good',
  'Acceptable'
]

export const suspension_options = [
    'front',
    'full',
    'none'
]


export const material_options = [
    'Steel',
    'Carbon Fiber',
    'Aluminium'
  ]
  
export const brake_type_options = [
    'Rim',
    'Disc',
    'Drum'
  ]
  
  
export const frame_size_options = [
    'XXS',
    'XS',
    'S',
    'M',
    'M/L',
    'L',
    'XL',
    'XXL'
  ]
  
  // in inches
export const wheel_size_options = [
    10,
    12,
    16,
    18,
    20,
    24,
    26,
    27,
    27.5,
    29,
    32
  ]
  
export const brand_options = [
  'Trek',
  '3T',
  'All-City',
  'Cannondale',
  'Giant',
  'Kona',
  'Specialized',
  'Scott',
  'Cervelo',
  'Colnago',
  'BMC',
  'Merida',
  'Orbea',
  'Bianchi',
  'Other'
]

  
export const fulfillment_method_options = [
  'Pickup',
  'Delivery'
]

export const selling_method_options = [
  'Buyer pickup',
  'Ship to buyer',
  'Biketail pickup'
]

export const transaction_details_options = ['E-transfer', 'Cash', 'Free shipping', 'Other'];

export const buyer_pickup_transaction_options = ['E-transfer', 'Cash', 'Other'];
export const ship_to_buyer_transaction_options = ['Free shipping', 'Buyer pays all', 'Buyer pays fixed fee'];
// biketail_pickup_transaction_options = [] install


export default {
  type_options,
  color_options,
  condition_options,
  suspension_options,
  material_options,
  brake_type_options,
  frame_size_options,
  wheel_size_options,
  brand_options,
  fulfillment_method_options,
  selling_method_options,
  transaction_details_options,
  buyer_pickup_transaction_options,
  ship_to_buyer_transaction_options
}