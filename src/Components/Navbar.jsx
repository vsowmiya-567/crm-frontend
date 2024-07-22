import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <NavLink to='/signup' >Sign Up</NavLink>
            <NavLink to='/signin' >Sign In</NavLink>
        </div>
    );
};

export default Navbar;