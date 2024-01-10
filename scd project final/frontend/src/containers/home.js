import {React,useState,useEffect} from "react";
import '../css/latestproduct.css'
import { Link } from "react-router-dom";


const Home = () => {
    
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products/latest-products/") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setLatestProducts(data))
      .catch((error) => console.error("Error fetching latest products: ", error));
  }, []);

    return (
        <div>
            <div className="container"style={{backgroundColor:"light" ,alignItems:'center'}}>
                <div className="mt-1  pl-5 pr-5">
                    <h1 className="display-4" style={{textAlign:'center',textwight:'bold',fontFamily:'Cold Warm by Chequered Ink' }}>
                       <strong> Welcome to our Ecommerce Website</strong>
                    </h1>
                </div>     
            </div>
            <div className="column is-multiline">
              <div className="column is-12">
                <h2 className="is-size-2 has-text-centered">Latest Products</h2>
              </div>
              {latestProducts.map((product) => (
                <div className="column is-3" key={product.id}>
                  <div className="box">
                    <figure className="image mb-1">
                    <img src={product.get_thumbnail} alt={product.name} style={{height:'210px', width: '100%', objectFit: 'contain', padding:'0px', margin:'0px'}}/>
                    </figure>
                    <div style={{paddingRight:'20px', paddingLeft:'20px',marginBottom:'5px'}}>
                        <h3 className="is-size-4">{product.name}</h3>
                        <p className="is-size-6 has-text-grey">${product.price}</p>
                        <Link to={product.get_absolute_url}>View Details</Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>


    </div>
    )
    }

 export default Home;