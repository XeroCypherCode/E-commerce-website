import { useDispatch,useSelector,useParams } from "react-redux";
import { searchProducts } from "../actions/search";
import { useEffect } from "react";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams(); // Extract keyword from URL parameters
  const products = useSelector(state => state.productSearch.products);
  const loading = useSelector(state => state.productSearch.loading);

  useEffect(() => {
      if (keyword) {
          dispatch(searchProducts(keyword));
      }
  }, [dispatch, keyword]);


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
                <h2 className="is-size-2 has-text-centered">Searched Products</h2>
              </div>
              {products.map((product) => (
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
);}
const mapStateToProps = state => ({
    product: state.product.product,
    loading: state.product.loading,

});


export default connect(mapStateToProps, { searchProducts })(SearchPage);