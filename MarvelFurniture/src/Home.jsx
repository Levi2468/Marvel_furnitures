import './css/home.css';
import top_img from './assets/Home-top.png';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import ContextManage from './context';

function Portal({ isOpen, children }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="portal-outer">
            <div className="portal-inner">
                {children}
            </div>
        </div>,
        document.body
    );
}

function Index() {
    const Achievement = [
        { desc: "Years of Experience", count: "15" },
        { desc: "Successful Projects", count: "100" },
        { desc: "Branches", count: "25" },
        { desc: "Happy Customers", count: "1200" }
    ];

    const marquee = [
        'Free Delivery Across India',
        'Handcrafted solid Wood Frames',
        '2-Years Craftsmanship Warranty',
        '4.9 Average Customer Rating',
        'Easy returns'
    ];

    const products = [
        { img1: "sofa1", img2: "sofa2", prod: "Sofa" },
        { img1: "chair1", img2: "chair2", prod: "Chair" },
        { img1: "bed1", img2: "bed2", prod: "Bed" },
        { img1: "bench1", img2: "bench2", prod: "Bench" },
        { img1: "diningtable1", img2: "diningtable2", prod: "Dining Table" },
        { img1: "dressers1", img2: "dressers2", prod: "Dressers" },
        { img1: "shelves1", img2: "shelves2", prod: "Shelving" },
        { img1: "coffeetable1", img2: "coffeetable2", prod: "Coffee Tables" }
    ];

    const TopPick = {
        Image: 'T-selling',
        Product: 'Nordic Breeze 3-Seater',
        Old: '30,000',
        New: '14,999',
        dis: '40'
    };

    const [source, setSource] = useState({
        img1: "sofa1",
        img2: "sofa2"
    });

    const [selectProduct, setSelectProduct] = useState(0);
    const [isOpen, setOpen] = useState(false);

    const { cartItems, addToCart } = useContext(ContextManage);

    const images = import.meta.glob(
        "./assets/*.jpeg",
        {
            eager: true,
            import: "default"
        }
    );

    const getImage = (name) => images[`./assets/${name}.jpeg`];

    const TopDescription = [
        ["Model Name", "Nordic Breeze 3-Seater"],
        ["Size/Dimensions", "84 x 32 x 14 inches"],
        ["Frame Material", "Solid kiln-dried eucalyptus"],
        ["Leg Material", "Tapered solid oak legs"],
        ["Cushion Fill", "High-resilience polyurethane"],
        ["Upholstery Fabric", "Textured woven polyester"]
    ];

    const Cards = [
        {
            Image: 'chair1',
            Product: 'Markings Chairs',
            Old: '12,999',
            New: '10,999',
            dis: '20'
        },
        {
            Image: 'diningtable2',
            Product: 'Effora dining',
            Old: '16,999',
            New: '13,999',
            dis: '10'
        },
        {
            Image: 'chair2',
            Product: 'Aeron Chair',
            Old: '11,999',
            New: '9,999',
            dis: '15'
        },
        {
            Image: 'sofa2',
            Product: 'Mota Sofa',
            Old: '23,999',
            New: '20,999',
            dis: '33'
        },
        {
            Image: 'sofa1',
            Product: 'Ant sofa',
            Old: '25,999',
            New: '22,999',
            dis: '8'
        },
        {
            Image: 'bed2',
            Product: 'Central mattress bed',
            Old: '12,999',
            New: '10,999',
            dis: '21'
        }
    ];

    const isAdded = (product) => {
        return cartItems.some(
            item => String(item.product_id) === String(product.Product)
        );
    };

    return (
        <div className="page">

            {/* TOP SECTION */}
            <section className="top-section">
                <div className="top-content">
                    <h1>
                        Marvels
                        <span
                            style={{
                                display: 'block',
                                color: 'orange',
                                marginLeft: '25%'
                            }}
                        >
                            Furniture
                        </span>
                    </h1>

                    <p>
                        Manufacture and sale of modern, <br />
                        stylish, high-quality furniture in Minsk
                    </p>
                </div>

                <div className="top-img-container">
                    <img className="top-img" src={top_img} alt="Furniture" />
                </div>
            </section>

            {/* ACHIEVEMENTS */}
            <section className="achievements">
                {Achievement.map((post, index) => (
                    <div key={index}>
                        <span className="count">{post.count}</span>+
                        <br />
                        {post.desc}
                    </div>
                ))}
            </section>

            {/* MARQUEE */}
            <section className="marquee">
                <div className="track">
                    {[...marquee, ...marquee].map((banner, index) => (
                        <span className="banners" key={index}>
                            {banner}
                        </span>
                    ))}
                </div>
            </section>

            {/* FURNITURE CATEGORY */}
            <section className="Category">
                <h2>Furniture Category</h2>

                <div className="showcase">
                    <div className="showImage">
                        <img
                            src={getImage(source.img1)}
                            alt="Furniture category"
                        />
                    </div>

                    <div className="product-container">
                        {products.map((item, index) => (
                            <div key={item.prod}>
                                <div
                                    className={`products ${
                                        selectProduct === index
                                            ? 'product-select'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setSource({
                                            img1: item.img1,
                                            img2: item.img2
                                        });

                                        setSelectProduct(index);
                                    }}
                                >
                                    {item.prod}
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>

                    <div className="showImage">
                        <img
                            src={getImage(source.img2)}
                            alt="Furniture category"
                        />
                    </div>
                </div>
            </section>

            {/* TOP PICK */}
            <section className="TopPick">
                <h2>Top Pick</h2>

                <div className="Top-pick-container">
                    <div className="TopImg">
                        <img
                            src={getImage(TopPick.Image)}
                            alt={TopPick.Product}
                        />

                        <div>
                            Price: <del>Rs {TopPick.Old}/-</del>
                            {' '}
                            <b>Rs {TopPick.New}/-</b>
                            &nbsp;
                            <mark>- {TopPick.dis}%</mark>
                        </div>

                        <div>
                            <button
                                className={`buybtn ${
                                    isAdded(TopPick) ? 'added' : ''
                                }`}
                                disabled={isAdded(TopPick)}
                                onClick={() => addToCart(TopPick)}
                            >
                                {isAdded(TopPick)
                                    ? 'Added'
                                    : 'Add to cart'}
                            </button>
                        </div>
                    </div>

                    <div className="description">
                        <h3
                            style={{
                                textAlign: 'center',
                                color: '#6B4326',
                                marginBlock: '10px'
                            }}
                        >
                            Product Description
                        </h3>

                        <ul>
                            {TopDescription.map((prod, index) => (
                                <li key={index}>
                                    <span className="Prod-title">
                                        {prod[0]}
                                    </span>
                                    {' : '}
                                    {prod[1]}
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* RECOMMENDATIONS */}
            <section className="recommendations">
                <h2>Recommendations</h2>

                <div className="cards-container">
                    {Cards.map((prod) => (
                        <div className="cards" key={prod.Product}>
                            <img
                                className="reco-img"
                                src={getImage(prod.Image)}
                                alt={prod.Product}
                            />

                            <div>
                                <b style={{ color: 'brown' }}>
                                    {prod.Product}
                                </b>
                            </div>

                            <div>
                                Price: <del>Rs {prod.Old}/-</del>
                                {' '}
                                <b>Rs {prod.New}/-</b>
                                &nbsp;
                                <mark>- {prod.dis}%</mark>
                            </div>

                            <div>
                                <button
                                    className={`buybtn ${
                                        isAdded(prod) ? 'added' : ''
                                    }`}
                                    disabled={isAdded(prod)}
                                    onClick={() => addToCart(prod)}
                                >
                                    {isAdded(prod)
                                        ? 'Added'
                                        : 'Add to cart'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* OFFER POPUP */}
            <Portal isOpen={isOpen}>
                <h2>Limited sale offer</h2>

                <button
                    onClick={() => setOpen(false)}
                    className="portal-close-x"
                >
                    x
                </button>

                <p>
                    Get early notifications on all our event offers in your email.
                </p>

                <form onSubmit={(event) => event.preventDefault()}>
                    <input
                        type="email"
                        className="getoffer-mail"
                        placeholder="Enter your email address..."
                    />

                    <button
                        type="button"
                        className="mail-btn"
                        onClick={() => setOpen(false)}
                    >
                        Get offer
                    </button>

                    <button
                        type="button"
                        className="mail-btn close-btn"
                        onClick={() => setOpen(false)}
                    >
                        Later
                    </button>
                </form>
            </Portal>

        </div>
    );
}

export default Index;