import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContextManage from './context';
import './css/topselling.css';

function Topselling(){
    const {cartItems,setItems}=useContext(ContextManage);
    const images=import.meta.glob('./assets/*',{eager:true,import:'default'});
    const getImage=(name)=>images[`./assets/${name}.jpeg`];

    const products=[
        {Image:'rolling chairs',Product:'Featherlite Astro High Back Mesh Office Chair',Old:'13,000',New:'10,999',dis:'20',count:'1',category:'TOP SELLING CHAIR',rating:4},
        {Image:'topsellingsofa',Product:'Urban Ladder Luna 3 Seater Fabric Sofa',Old:'12,000',New:'8,999',dis:'30',count:'1',category:'TOP SELLING SOFA',rating:4},
        {Image:'bed2',Product:'Wakefit Leo Queen Size Engineered Wood Bed',Old:'32,000',New:'25,999',dis:'19',count:'1',category:'TOP SELLING BED',rating:4},
        {Image:'dressers2',Product:'Wakefit Engineered Wood Dressing Table',Old:'44,000',New:'34,999',dis:'20',count:'1',category:'TOP SELLING DRESSER TABLE',rating:4},
        {Image:'shelves2',Product:'Wakefit Dark Walnut Bookshelf',Old:'14,000',New:'9,999',dis:'29',count:'1',category:'TOP SELLING SHELVES',rating:4},
        {Image:'bench2',Product:'Home Centre Adana Grand Sheesham Wood Bench',Old:'4,000',New:'3,000',dis:'25',count:'1',category:'TOP SELLING BENCH',rating:4}
    ];
    const addToCart=(product)=>{
        setItems((previous)=>{
            const exists=previous.find((items)=>items.Product===product.Product);
            if(exists) return previous.map((items)=>items.Product===product.Product
                ? {...items,count:String(Number(items.count||1)+1)}:items);
            return [...previous,{...product}];
        });
    };
    const reviews=[
        {name:'Martin',image:'M',product:'Helios California Fabric 2-Seater Sofa',review:'A comfortable sofa with a quality finish. It looks great in the living room.'},
        {name:'Customer',image:'flower',product:'Modern lounge chair',review:'The design and material quality are excellent for the price.'},
        {name:'Home Buyer',image:'nature 😝☘️',product:'Living room collection',review:'Good style, useful furniture and a smooth shopping experience.'}
    ];
    return(
        <div className="topselling-page">
            <h2 className="topselling-title">TOP SELLING COLLECTIONS</h2>
            <main className="topselling-list">
                {products.map((product)=> {
                    const isAdded=cartItems.some((items)=>items.Product===product.Product);
                    return(
                        <div className="topselling-card" key={product.Product}>
                            <div className="topselling-info">
                                <b>{product.category}</b>
                                <p>{product.Product}</p>
                                <p className="topselling-stars">{'★'.repeat(product.rating)}<span>★</span></p>
                                <p>Price: <del>₹{product.Old}</del> <strong>₹{product.New}</strong> <mark>-{product.dis}%</mark></p>
                                <button className={isAdded?'topselling-added':''} onClick={()=>addToCart(product)}>
                                    {isAdded?'Added':'Add to Cart'}
                                </button>
                            </div>
                            <div className="topselling-img"><img src={getImage(product.Image)} alt={product.category}/></div>
                        </div>
                    );
                })}
            </main>
            <h2 className="topselling-title">TOP REVIEWS</h2>
            <section className="topselling-reviews">
                {reviews.map((review)=>
                    <div className="topselling-review" key={review.name}>
                        <img src={getImage(review.image)} alt={review.name}/>
                        <div>
                            <p className="review-name">{review.name}</p>
                            <p className="topselling-stars">★★★★<span>★</span></p>
                            <p><b>Product:</b> {review.product}</p>
                            <p><b>Review:</b> {review.review}</p>
                        </div>
                    </div>
                )}
            </section>
            <div className="topselling-cart-link"><Link to="/cart">View Cart ({cartItems.length})</Link></div>
        </div>
    );
}
export default Topselling;
