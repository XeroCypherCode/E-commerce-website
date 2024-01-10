import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateuserprofile } from '../actions/profile';
import { delete_account } from '../actions/auth';

const Dashboard = ({
    delete_account,
    updateuserprofile,
    first_name_global,
    last_name_global,
    phone_global,
    address_global

}) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        address:''
       
    });

    const { first_name, last_name, phone,address } = formData;

    useEffect(() => {
        setFormData({
            first_name: first_name_global,
            last_name: last_name_global,
            phone: phone_global,
            address:address_global,
           
        });
    }, [first_name_global]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(window.confirm("your credentials will b update!")){
        updateuserprofile(first_name, last_name, phone, address);}
        else{

        }
    };
     const del =() =>{
        if(window.confirm("your account will b deleted permenently")){
            delete_account()
        }
        else{}
     };

    return (
        <div className='container mb-5 mt-5' style={styles.container}>
           
            <h1 style={styles.heading}>
                <strong >Welcome to Dashboard</strong>
            </h1>

            <p className='mt-3 mb-3' style={styles.subheading}>
                Enter your credentials to create profile :</p>

        <form onSubmit={e => onSubmit(e)}  style={styles.form}>
                <div className='form-group'>
                    <label className='form-label' htmlFor='first_name' style={styles.label}>
                        First Name</label>
                    <input
                        className='form-control'
                        type='text'
                        name='first_name'
                        placeholder={first_name_global}
                        onChange={e => onChange(e)}
                        value={first_name}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='last_name' style={styles.label}>
                        Last Name</label>
                    <input
                        className='form-control'
                        type='text'
                        name='last_name'
                        placeholder={last_name_global}
                        onChange={e => onChange(e)}
                        value={last_name}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='phone'style={styles.label}>
                        Phone</label>
                    <input
                        className='form-control'
                        type='text'
                        name='phone'
                        placeholder={phone_global}
                        onChange={e => onChange(e)}
                        value={phone}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='address' style={styles.label}>
                        Address</label>
                    <input
                        className='form-control'
                        type='text'
                        name='address'
                        placeholder={address_global}
                        onChange={e => onChange(e)}
                        value={address}
                    />
                </div>
              
                <button className='btn btn-primary mt-3' type='submit'  style={styles.submitbutton} >
                    Update Profile</button>
            </form>
            <p className='mt-3'style={styles.subheading}>
                Click the button below to delete your user account !
            </p>
            <a
                className='btn btn-danger '
                href='#!'
                onClick={del}
                style={styles.button}
            >
                Delete Account
            </a>
        </div>
    )
   }
   const styles = {
    container: {
      alignItems: 'center',
      maxWidth: '500px',
      backgroundColor: '#E8E8E8',
      paddingBottom: '5px',
      paddingTop: '5px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      textAlign: 'center',
      textDecoration: 'bold',
      fontFamily: 'Cold Warm by Chequered Ink',
      marginTop: '10px',
      fontSize: '25px',
    },
    subheading: {
      fontFamily: 'Cold Warm by Chequered Ink',
      textAlign: 'center',
    },
    form: {
      alignItems: 'center',
      maxWidth: '450px',
      padding: '10px',
    },
    label: {
      fontFamily: 'Cold Warm by Chequered Ink',
      fontSize: '25px',
    },
    submitbutton:{
        width: "100%",
        background: "#DD571C",
        borderColor: "#DD571C",
        padding: "6px",
        fontFamily:'Cold Warm by Chequered Ink',
        fontSize:'20px'
    },
    button: {
      width: '90%',
      background: 'lightred',
      borderColor: 'lightred',
      padding: '10px',
      fontFamily: 'Cold Warm by Chequered Ink',
      fontSize: '20px',
      marginBottom: '10px',
      marginLeft: '10px',
      marginRight: '10px',
    },
};

const mapStateToProps = state => ({
    first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name,
    phone_global: state.profile.phone,
    address_global: state.profile.address
    
});

export default connect(mapStateToProps, { 
    delete_account,
    updateuserprofile
 })(Dashboard);
