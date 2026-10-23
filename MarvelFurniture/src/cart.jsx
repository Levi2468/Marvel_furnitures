import { useContext } from "react";
import ContextManage from "./context";
import './css/cart.css';

function Cart() {
    const {
        cartItems,
        updateQuantity,
        removeFromCart
    } = useContext(ContextManage);

    const images = import.meta.glob(
        "./assets/*.jpeg",
        { eager: true, import: "default" }
    );

    const getImage = (name) => {
        if (!name) return "";

        // Support a direct URL if the API stores one.
        if (name.startsWith("http") || name.startsWith("/")) {
            return name;
        }

        return images[`./assets/${name}.jpeg`] || "";
    };

    const days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ];

    const show_day = days[(new Date().getDay() + 1) % 7];

    const totalProducts = cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    const totalPrice = cartItems.reduce(
        (total, item) => total + Number(item.old_price ?? item.Old?.replace(/,/g, "") ?? item.price) * Number(item.quantity || 0),
        0
    );

    const totalAmount = cartItems.reduce(
        (total, item) => total + Number(item.price ?? item.New?.replace(/,/g, "") ?? 0) * Number(item.quantity || 0),
        0
    );

    const totalDiscount = totalPrice - totalAmount;
    const deliveryCharge = 0;

    const formatPrice = (price) =>
        Number(price || 0).toLocaleString('en-IN');

    if (cartItems.length === 0) {
        return (
            <div className="emt-cart">
                <div>
                    <div className="cart-message">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>Your cart is Empty</span>
                    </div>

                    <div style={{
                        fontSize: '1em',
                        textAlign: 'center',
                        color: 'gold'
                    }}>
                        Add items to checkout
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">

            <main className="cart-shelves">
                {cartItems.map((cart_prod) => (
                    <div
                        className="cart-card"
                        key={cart_prod.id ?? cart_prod.product_id}
                    >
                        <div className="cart-image">
                            <img
                                src={getImage(cart_prod.image ?? cart_prod.Image)}
                                alt={cart_prod.name ?? cart_prod.Product}
                            />
                        </div>

                        <div className="prod-details">
                            <div className="cart-card-head">
                                <span className="prod-title">
                                    {cart_prod.name ?? cart_prod.Product}
                                </span>

                                <span className="delv">
                                    Delivered by Tomorrow, {show_day}
                                </span>
                            </div>

                            <div className="prod-pricing">
                                Price:
                                    <del>
                                        Rs{Number(cart_prod.old_price ?? 0).toLocaleString("en-IN")}/-
                                    </del>

                                    <b>
                                        Rs{Number(cart_prod.price ?? 0).toLocaleString("en-IN")}/-
                                    </b>

                                {cart_prod.dis && (
                                    <mark>- {cart_prod.dis}%</mark>
                                )}

                                <span
                                    style={{ color: 'green', cursor: 'pointer' }}
                                    title="Discount on First order"
                                >
                                    Offer applied <i className="fa-solid fa-circle-info"></i>
                                </span>
                            </div>

                            <div className="add-remove">
                                <label>
                                    Quantity:
                                    <input
                                        type="number"
                                        min={1}
                                        max={10}
                                        value={cart_prod.quantity ?? 1}
                                        onChange={(e) => {
                                            const qty = Number(e.target.value);

                                            if (qty >= 1 && qty <= 10) {
                                                updateQuantity(cart_prod.id, qty);
                                            }
                                        }}
                                    />
                                </label>

                                <button
                                    onClick={() => removeFromCart(cart_prod.id)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            <aside className="billing">
                <div className="billing-card">

                    <h3>PRICE DETAILS</h3>

                    <div className="bill-row">
                        <span>Price ({totalProducts} items)</span>
                        <span>₹{formatPrice(totalPrice)}</span>
                    </div>

                    <div className="bill-row">
                        <span>Discount</span>
                        <span className="bill-discount">
                            - ₹{formatPrice(totalDiscount)}
                        </span>
                    </div>

                    <div className="bill-row">
                        <span>Delivery Charges</span>
                        <span>
                            <del>₹{formatPrice(100)}</del>
                            <b className="free-delivery"> FREE</b>
                        </span>
                    </div>

                    <div className="bill-total">
                        <span>Total Amount</span>
                        <span>₹{formatPrice(totalAmount + deliveryCharge)}</span>
                    </div>

                    <p className="savings">
                        You will save ₹{formatPrice(totalDiscount)} on this order
                    </p>

                    <button
                        className="checkout-btn"
                        onClick={() => alert("Checkout feature coming soon!")}
                    >
                        CHECKOUT
                    </button>

                </div>
            </aside>

        </div>
    );
}

export default Cart;