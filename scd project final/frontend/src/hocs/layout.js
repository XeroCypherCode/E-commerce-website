import React ,{useEffect,Fragment} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { connect } from 'react-redux';
import { checkauthentication } from '../actions/auth';
import { load_user } from '../actions/profile';

const Layout = ({children,checkauthentication,load_user}) => {
    useEffect(() =>{
        checkauthentication();
        load_user()
    },[]);

    return(
        <Fragment>
            <Navbar/>
                {children} 
            <Footer />
        </Fragment>  
    );  
}

export default connect(null,{checkauthentication,load_user})( Layout);