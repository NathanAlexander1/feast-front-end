// Navbar accordian with
//Shopping list
// Donation list
// Kitchen list
// Calendar

// Recipe suggestions

// Logout

// Tenatively Meal planner
import "../styles/Navbar.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom"

function Navbar(props) {
    const navigate = useNavigate();
    const logoutFunc = () => {
        props.handleLogout();
        navigate("/login")
    }
    return (
        <ul className="bg-slate-800 p-8 display flex row flex-wrap justify-around text-purple-200 font-mono font-bold">
        {props.isLoggedIn ? <a className='hover:text-yellow-400  hover:tracking-wide' href="/logout " onClick = {logoutFunc}>Logout</a> : <a className='hover:text-yellow-400  hover:tracking-wide' href="/login">Login/Signup</a>}
        <a className='hover:text-yellow-400  hover:tracking-wide' href="/shoppinglist">Shopping List</a>
        <a className='hover:text-yellow-400  hover:tracking-wide' href="/donationlist">Donation List</a>
        {/* <a className='hover:text-yellow-400  hover:tracking-wide' href="/calendar">Calendar</a> */}
        <a className='hover:text-yellow-400  hover:tracking-wide' href="/kitchen">Kitchen</a>
        {/* <a className='hover:text-yellow-400  hover:tracking-wide' href="/recipe">Filter recipes by ingredients</a> */}
        <a className='hover:text-yellow-400  hover:tracking-wide' href="/storage">Storage</a>
        
        </ul>
    );
}

export default Navbar;
