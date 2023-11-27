import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../actions/product';
import { useParams } from 'react-router-dom';

const Product = ({ getProduct, product, loading }) => {
    const { category_slug, product_slug } = useParams();
    console.log('comp',category_slug)
    console.log('comp',product_slug)
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        getProduct(category_slug, product_slug);
    }, [getProduct, category_slug, product_slug]);

    if (loading || product === null) {
        return <h2>Loading...</h2>;
    }
      
        const addToCart = () => {
            // handle add to cart
        };

    return (
        <div className="container" 
                                                    style={{ 
                                                    alignitems: 'center', 
                                                    justifycontent: 'center',
                                                    background:'#E8E8E8',
                                                    marginTop:'30px',
                                                    marginBottom:"30px",
                                                    
                                                   }}>
            <div className="columns is-multiline" 
                                                    style={{ display: 'flex', flexwrap: 
                                                    'wrap', marginRight: '-15px',
                                                    marginLeft: '15px',}}>
                <div className="column is-9" 
                                                    style={{ 
                                                    
                                                    flexgrow: '1', 
                                                    maxwidth: '100%', 
                                                    paddingright: '15px', 
                                                    paddingleft: '15px'}}>

                   <figure className="image mb-6" 
                                                style={{display: 'block',
                                                 maxWidth: '100%', height: '600px',
                                                 marginTop:'30px'}}>

                         <img src={product.get_image} alt="Product" 
                                                 style={{display:'block', width: '100%',
                                                  height: '100%', objectFit: 'contain'
                                                  }} />
                    </figure>
                   <h4 style={{marginTop:'10px',
                    fontFamily:'Cold Warm by Chequered Ink',fontWeight:'bold'}}>
                        Details : </h4>
                        <p>{product.description.split('\n').map((line, index) => <React.Fragment key={index}>{line}<br/></React.Fragment>)}</p>
                </div>

                <div className="column is-3"        style={{marginLeft:'80px',alignSelf:'center'}}>
                    
                    <h1 className="title"           style={{  marginTop:'10px',fontFamily:'Cold Warm by Chequered Ink',fontWeight:'bolder'}}>{product.name}</h1>

                    <h2 className="subtitle"        style={{fontFamily:'Cold Warm by Chequered Ink'}}>
                        Information</h2>
                    <p>
                        <strong>Price: </strong>{product.price}
                    </p>
                    <hr></hr>
                    <div className="field has-addons mt-6" 
                                            style={{ 
                                                marginBottom: '1.5rem',
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                alignItems: 'stretch'}}
                    >
                     <div className="control" style={{flexGrow:'1'}}>

                        <h4 style={{fontFamily:'Cold Warm by Chequered Ink'}}>Quantity</h4>

                        <input type="number" value={quantity} onChange={(e) => {if (e.target.value > 0) {setQuantity(e.target.value);}} }/>
                        </div>

                        <div className="control" >
                            <button className="button is-dark" onClick={addToCart}
                                                style={{
                                                    flexGrow: '1',
                                                    display: 'inline-block',
                                                    fontFamily:'Cold Warm by Chequered Ink',
                                                    fontWeight: 'bolder',
                                                    textAlign: 'center',
                                                    whiteSpace: 'nowrap',
                                                    verticAlalign: 'middle',
                                                    userSelect: 'none',
                                                    border: '1px',
                                                    borderColor:'#DD571C',
                                                    background:'#DD571C',
                                                    marginTop:'25px',
                                                    marginLeft:"15px",
                                                    fontSize: '20px',
                                                    lineHeight:' 1.25',
                                                    borderRadius:' 0.25em,',
                                                    transition: 'all 0.15s',
                                                    cursor: 'pointer',
                                                    padding:"10px",
                                                    width:'250px',

                                                }}>
                                Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    product: state.product.product,
    loading: state.product.loading
});


export default connect(mapStateToProps, { getProduct })(Product);