import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import CSRFToken from "../components/CSRFToken";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    re_password: "",
  });

  const { email,password, re_password } = formData;

  const [accountCreated, setAccountCreated] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const registrationOutcome = await register(email, password, re_password);
    if (password !== re_password) {
      // Display an error message that passwords do not match
      alert("Passwords do not match");
      setAccountCreated(false);
    } 
    else if (registrationOutcome ==='errorformate') {
        // Display an error message for invalid email format
       alert("Please enter a valid email address in the format 'example@example.com'");
       setAccountCreated(false);
     }
      
    else {
      if (registrationOutcome === "success") {
        setAccountCreated(true);
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  } else if (accountCreated) {
    return <Navigate to="/login" />;
  }
  return (
    <div
      className="container mt-5 ml-5 mb-5"
                                            style={{ backgroundColor: "#E8E8E8",
                                            maxWidth: "477px", alignItems: "center", 
                                            paddingBottom:'5px',paddingTop:'5px' }}
    >
      <h1
                                            style={{
                                              textAlign: "center",
                                              textDecoration: "bold",
                                              fontFamily:'Cold Warm by Chequered Ink',
                                              margineTop:'10px'
                                            }}
      >
        <strong>Register </strong>
       
      </h1>
      <form onSubmit={(e) => onSubmit(e)} style={{ maxWidth: "450px" }}>
        <CSRFToken />
        <div
                                                style={{
                                                  border: "1px solid",
                                                  borderColor: "#E8E8E8",
                                                  padding: "10px",
                                                  borderRadius: "1.5%",
                                                }}
        >
          <div className="form-group">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="email"
              name="email"
              onChange={(e) => onChange(e)}
              value={email}
              
              title="Please enter a valid email address in the format 'example@example.com'"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control mt-2"
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => onChange(e)}
              value={password}
              minLength="6"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              className="form-control mt-2"
              type="password"
              placeholder="re-enter password"
              name="re_password"
              onChange={(e) => onChange(e)}
              value={re_password}
              minLength="6"
              required
            />
          </div>
          <button
            className="btn btn-primary mt-4"
            type="submit"
                                                    style={{
                                                      width: "100%",
                                                      background: "#DD571C",
                                                      borderColor: "#DD571C",
                                                      padding: "6px",
                                                      fontFamily:'Cold Warm by Chequered Ink',
                                                      fontSize:'20px'
                                                    }}
          >
            <strong>Register</strong>
          </button>
        </div>
      </form>
        <p className="mt-3 mb-3"                      style={{ textAlign: "center" ,
                                                      fontFamily:'Cold Warm by Chequered Ink'}}>
        Already have an account<Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
