import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/Seller/seller.css';

export default function PostConfirm() {
  return (
    <div>
        <h1>Post Successful!</h1>
        <Link to='/'>
            <h4>Click here to return home.</h4>
        </Link>
    </div>
  )
}
