import React, { Fragment } from 'react';
import {  Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ isAuthenticated, logout }) => {

 
    const authLinks = (
        <Fragment>
            <li>
                <NavLink className='nav-link' to='/cart'>
                <p style={{fontSize:'30px' ,width:'10px',marginRight:'30px',marginLeft:'25px', marginBottom:'0px', alignContent:'baseline'}}>🛒</p>
                </NavLink>
            </li>
            <li className='nav-item '>
                <NavLink className='nav-link' to='/dashboard'><strong >Dashboard</strong></NavLink>
            </li>
            <li className='nav-item '>
                <NavLink className='nav-link' onClick={logout} to='/login' ><strong >Logout</strong></NavLink>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <NavLink className='nav-link' to='/cart'>
                <p style={{fontSize:'30px' ,width:'10px',marginRight:'30px',marginLeft:'25px', marginBottom:'0px', alignContent:'baseline'}}>🛒</p>
                </NavLink>
            </li>
            <li className='nav-item '>
                <NavLink className='nav-link mt-2' to='/login'><strong >Login</strong></NavLink>
            </li>
            <li className='nav-item '>
                <NavLink className='nav-link  mt-2' to='/register'><strong >Sign Up</strong></NavLink>
             </li>
           
        </Fragment>
    );
   

    return (
        <nav className='navbar navbar-expand-lg 'style={{background:' #DD571C'}}>
            <div className='container-fluid'>
            <Link className='nav-link ' to='/'>
                <strong 
                style={{fontFamily:'serif' , color:'black' , fontWeight:'bolder' ,fontSize:'20px',textAlign:'top'}}>
                E-commerce</strong>   
            </Link>
                <div className="justify-content-center col-5" >
                    <form className="d-flex" role="search">
                         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success" type="submit" style={{color:'black',borderColor:'black'}}>Search</button>
                    </form>
                </div>
             
                <button
                className="navbar-toggler"
                type="button"  
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNave" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse justify-content-end '  id='navbarNave'style={{maxWidth:'300px'}}>
                   
                    <ul className='navbar-nav justify-content-end'>
                    
                            { isAuthenticated? authLinks : guestLinks }
                        
                    </ul>
                    
                </div>
                
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);