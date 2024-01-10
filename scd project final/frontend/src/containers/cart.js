import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { viewCart ,removeFromCart} from '../actions/cart';
import { checkauthentication } from '../actions/auth';
import { useNavigate} from 'react-router-dom';
const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);
  const cartItems = useSelector(state => state.cart.cartItems);
  const productId = useSelector(state => state.cart.cartItems.product_id);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const message = useSelector(state => state.cart.message);

  useEffect(() => {
    dispatch(checkauthentication());
    if(!checkauthentication()){
      alert('login to view your cart')
     navigate('/login');
    }
    else{
      dispatch(viewCart(userId));
    }
    
  }, [dispatch, userId]);
 
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(userId, productId)).then(() => {
     setShowMessage(true);
     setTimeout(() => setShowMessage(false), 3000); // hide after 3 seconds
    });
    };
  return (
    <div className="container" style={styles.container}>
      <div>
        <h1 className="heading" style={styles.heading}>
          Welcome to your cart
        </h1>
        <div className="grid-container" style={styles.gridContainer}>
          {cartItems.map(item => (
            <div key={item.product_id} className="grid-item" style={styles.gridItem}>
              <img src={item.product_image} alt={item.product_name} style={styles.image} />
              <div style={styles.itemInfo}>
                <h2>{item.product_name}</h2>
                <p>Price: {item.product_price}</p>
                <p>Quantity : {item.quantity}</p>
                <button className='button' style={styles.button} onClick={handleRemoveFromCart()}>
                  REMOVE ITEM</button>
                  {showMessage && <p>{message}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    alignitems: 'center',
    justifycontent: 'center',
    background: '#E8E8E8',
    marginTop: '30px',
    marginBottom: '30px',
  },
  heading: {
    textAlign: 'center',
    textDecoration: 'bold',
    fontFamily: 'Cold Warm by Chequered Ink',
    marginTop: '10px',
    fontSize: '40px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr', // One column for each item
    gap: '0', // No gap between grid items
  },
  gridItem: {
    display: 'flex', // Use flexbox for side-by-side layout
    alignItems: 'center', // Align items vertically in the flex container
    background: 'rgba(255, 255, 255, 0.7)', // Add a semi-transparent background to the grid item
    padding: '20px', // Add some padding around the grid item
    margin: '5px', // Add margin for separation between grid items
  },
  itemInfo: {
    marginLeft: '40px', // Add some margin between the image and item info
  },
  image: {
    width: '300px', // Adjust the width of the image as needed
    height: 'auto', // Maintain aspect ratio
    display: 'block', // Ensure block-level display for proper layout
    marginLeft:'20px'
  },
  button:{
    fontFamily:'Cold Warm by Chequered Ink',
    fontWeight: 'bolder',
    textAlign: 'center',
    border: '1px',
    borderColor:'#DD571C',
    background:'#DD571C',
    fontSize: '20px',
    cursor: 'pointer',
    padding:"10px",
    width:'250px',
}
};



export default Cart;
