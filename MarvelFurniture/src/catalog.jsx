import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContextManage from './context';
import './css/catalog.css';

function Catalog(){
    const {cartItems,setItems}=useContext(ContextManage);

    const images=import.meta.glob('./assets/*', { eager:true, import:'default' });
    const getImage = (name) => images[`./assets/${name}.jpeg`];

    const products=[
        {Image:'assort_sofa3',Product:'Sofa Chair',Old:'15,000',New:'13,000',dis:'13',count:'1',
        detail:'A stylish single-seat upholstered lounge chair that blends the comfort of a sofa with a compact design.'},
        {Image:'assort_chair2',Product:'Dork Chair',Old:'6,000',New:'5,000',dis:'17',count:'1',
        detail:'A comfortable chair with a simple shape, made to complement modern living spaces.'},
        {Image:'assort_sofa2',Product:'Lux Sofa',Old:'18,000',New:'15,000',dis:'17',count:'1',
        detail:'A spacious sofa with a refined finish, designed for relaxing and bringing style to your room.'},
        {Image:'Accort_chair3',Product:'Accent Chair',Old:'6,000',New:'5,000',dis:'17',count:'1',
        detail:'A statement accent chair that adds character and extra seating to your home.'},
        {Image:'assort_sofa1',Product:'Alter Sofa',Old:'18,000',New:'15,000',dis:'17',count:'1',
        detail:'A modern sofa with a welcoming silhouette and a versatile look for everyday living.'}
    ];

    const addToCart=(product)=>{
        setItems((previous)=>{
            const exists=previous.find((items)=>items.Product===product.Product);
            if(exists){
                return previous.map((items)=>items.Product===product.Product
                    ? {...items,count:String(Number(items.count||1)+1)}
                    : items);
            }
            return [...previous,{...product,count:'1'}];
        });
    };

    return(
        <div className="catalog-page">
            <div className="catalog-ticker">
                <span>✦ FREE DELIVERY THIS WEEK ✦ NEW MARBLE COLLECTION ✦ LIMITED STOCK ON LUX SOFA ✦</span>
            </div>

            <header className="catalog-header">
                <div className="catalog-badge">NEW ★</div>
                <div className="catalog-poster">
                    <h1>NEW PRODUCTS</h1>
                    <p>Sofa and Chair Edition</p>
                </div>
            </header>

            <main className="catalog-list">
                {products.map((product,index)=>{
                    const isAdded=cartItems.some((items)=>items.Product===product.Product);
                    return(
                        <div className="catalog-card" key={product.Product}>
                            {index%2===0 && <img className="catalog-image" src={getImage(product.Image)} alt={product.Product}/>}
                            <div className="catalog-desc">
                                <h2>{product.Product}</h2>
                                <span className="catalog-price">₹{product.New}</span>
                                <span className="catalog-old"><del>₹{product.Old}</del> <mark>{product.dis}% OFF</mark></span>
                                <p>{product.detail}</p>
                                <button className={`catalog-buy ${isAdded?'added':''}`} onClick={()=>addToCart(product)}>
                                    {isAdded?'Added':'Add to Cart'}
                                </button>
                            </div>
                            {index%2!==0 && <img className="catalog-image" src={getImage(product.Image)} alt={product.Product}/>}
                        </div>
                    );
                })}
                <div className="catalog-cart-link">
                    <Link to="/cart">View Cart ({cartItems.length})</Link>
                </div>
            </main>
        </div>
    );
}
export default Catalog;
