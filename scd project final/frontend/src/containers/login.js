import React, { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect ,useDispatch,useDispatchdispatch} from 'react-redux';
import { login } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';
import { addToCart } from '../actions/cart';
import { getProduct } from '../actions/product';

const Login = ({ login, isAuthenticated }) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    
    const productSlug = localStorage.getItem('productslugs');
    const productId = localStorage.getItem('productId');
    const quantity = localStorage.getItem('quantity');

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const onSubmit = e => {
        e.preventDefault();
         
        if (!email.match(emailRegex)) {
            // Display an error message for invalid email format
            alert("Please enter a valid email address in the format 'example@example.com'");
            
        }
        else{
            login(email, password);
            
            }
        
if(isAuthenticated){
        if(productSlug && productId && quantity)
        {
            dispatch(addToCart(productId, quantity));
            navigate(`${productSlug}`);
            getProduct(productSlug)
            // Clear the local storage
            localStorage.removeItem('productId');
            localStorage.removeItem('quantity');
            localStorage.removeItem('productslugs');
        }
       else{
            navigate('/');
        }
    }
    };



    return (
        <div className='container mt-5 mb-5'        style={{alignSelf:'center', maxWidth:'480px',
                                                    backgroundColor:'#E8E8E8',paddingBottom:'5px'}}>

            <h1                                     style={{textAlign:'center',textDecoration:'bold',
                                                     fontFamily:'Cold Warm by Chequered Ink' }}>
                <strong>Sign In</strong>
            </h1>
            <form onSubmit={e => onSubmit(e)}>
                <div                                    style={{border:'1px solid', borderColor:'#E8E8E8',
                                                            padding:'10px',borderRadius:'1.5%'}}>
                <CSRFToken />
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='email'
                        name='email'
                        onChange={e => onChange(e)}
                        value={email}
                        required
                    />
                </div>
                <div className='form-group mt-3'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='password'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3 mb-2' type='submit' 
                                                            style={{width:'100%',background:'#DD571C',borderColor:'#DD571C',
                                                            padding:'6px', fontFamily:'Cold Warm by Chequered Ink',
                                                            fontSize:'20px'}}>
                   <strong>Login</strong> 
                </button>
                </div>
            </form>
            
            <p className='mt-3' style={{textAlign:'center',fontFamily:'Cold Warm by Chequered Ink'}}>
                Don't have an Account? <Link to='/register'>Sign Up</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);