import { createContext, useState, useEffect } from "react";

const ContextManage = createContext();

export default ContextManage;

const API = "http://127.0.0.1:8000/api/cart/";

// Keep the same cart ID after refreshing the page
let cartId = localStorage.getItem("cart_id");

if (!cartId) {
    cartId = crypto.randomUUID();
    localStorage.setItem("cart_id", cartId);
}

export function ContextProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // GET: Load cart from Django
    useEffect(() => {
        fetch(`${API}?cart_id=${cartId}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load cart");
                return res.json();
            })
            .then(data => setCartItems(data))
            .catch(error => console.error("Load cart error:", error));
    }, []);

    // PUT: Save updated cart to Django
    async function saveCart(items) {
        // Update the UI immediately
        setCartItems(items);

       const formattedItems = items.map(item => ({
    product_id: String(item.product_id ?? item.Product ?? item.id),
    name: item.name ?? item.Product,
    old_price: Number(
        item.old_price ?? String(item.Old ?? "0").replace(/,/g, "")
    ),
    price: Number(
        item.price ?? String(item.New ?? "0").replace(/,/g, "")
    ),
    image: item.image ?? item.Image ?? "",
    quantity: Number(item.quantity ?? 1)
}));

        try {
            const res = await fetch(API, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cart_id: cartId,
                    items: formattedItems
                })
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            const data = await res.json();

            // Use the saved records returned by Django
            setCartItems(data);
        } catch (error) {
            console.error("Save cart error:", error);
        }
    }

    // Add a product

function addToCart(product) {
    const productId = String(
        product.product_id ?? product.Product ?? product.id
    );

    const existing = cartItems.find(
        item => String(item.product_id ?? item.Product ?? item.id) === productId
    );

    let updatedCart;

    if (existing) {
        updatedCart = cartItems.map(item =>
            String(item.product_id ?? item.Product ?? item.id) === productId
                ? {
                    ...item,
                    quantity: Number(item.quantity ?? 1) + 1
                }
                : item
        );
    } else {
        updatedCart = [
            ...cartItems,
            {
                ...product,
                product_id: productId,
                name: product.name ?? product.Product,

                old_price: Number(
                    product.old_price ??
                    String(product.Old ?? "0").replace(/,/g, "")
                ),

                price: Number(
                    product.price ??
                    String(product.New ?? "0").replace(/,/g, "")
                ),

                image: product.image ?? product.Image ?? "",
                quantity: 1
            }
        ];
    }

    saveCart(updatedCart);
}

    // Change quantity using the Django product record ID
    function updateQuantity(id, quantity) {
        if (quantity < 1) return;

        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
        );

        saveCart(updatedCart);
    }

    // Remove a product
    function removeFromCart(id) {
        const updatedCart = cartItems.filter(item => item.id !== id);
        saveCart(updatedCart);
    }

    // Calculate total quantity
    const cartCount = cartItems.reduce(
        (total, item) => total + Number(item.quantity),
        0
    );

    // Calculate total price
    const cartTotal = cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
    );

    return (
        <ContextManage.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeFromCart,
                cartCount,
                cartTotal
            }}
        >
            {children}
        </ContextManage.Provider>
    );
}