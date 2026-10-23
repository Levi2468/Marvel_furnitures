import { NavLink, Link } from "react-router-dom";
import './css/navbar.css';
import logo from './assets/web-logo.png';
import { useContext, useState } from "react";
import ContextManage from "./context";

function Navbar() {
    const [menuOpen, triggerMenu] = useState(false);

    const closeMenu = () => triggerMenu(false);

    const current = ({ isActive }) => ({
        color: isActive ? 'white' : 'black',
        backgroundColor: isActive ? 'brown' : 'inherit',
        fontWeight: isActive ? 'bold' : '100',
        border: isActive ? '1px solid white' : 'none',
        textDecoration: 'none',
        padding: '5px'
    });

    const { cartItems } = useContext(ContextManage);

    // Count the total quantity, including duplicate products
    const cartCount = cartItems.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
    );

    return (
        <nav>
            <div className="icon">
                <img src={logo} alt="icon" />
            </div>

            <ul className={`navbar ${menuOpen ? "active" : ""}`}>
                <li>
                    <NavLink style={current} to="/" onClick={closeMenu}>
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink style={current} to="/catalog" onClick={closeMenu}>
                        Catalog
                    </NavLink>
                </li>

                <li>
                    <NavLink style={current} to="/topselling" onClick={closeMenu}>
                        Topselling
                    </NavLink>
                </li>

                <li>
                    <NavLink style={current} to="/aboutus" onClick={closeMenu}>
                        About-us
                    </NavLink>
                </li>

                <li>
                    <NavLink style={current} to="/contact" onClick={closeMenu}>
                        Contact
                    </NavLink>
                </li>
            </ul>

            <div className="cart-space">
                <button className="cart">
                    <Link className="link" to="/cart">
                        Cart
                        <i className="fa-solid fa-cart-shopping"></i>
                        <sup className="ItemCount">{cartCount}</sup>
                    </Link>
                </button>
            </div>

            <div
                className="menu-toggle"
                onClick={() => triggerMenu(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
}

export default Navbar;