"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/header";

function getCartFromStorage() {
  if (typeof window === "undefined") return [];
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

function setCartToStorage(cart) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// function Header() {
//   return (
//     <header className="w-full flex items-center justify-between py-6 px-4 sm:px-12 bg-white shadow-sm mb-8">
//       <h1 className="text-2xl font-bold tracking-tight text-gray-900">Buyewon</h1>
//       <button
//         className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
//         aria-label="View cart"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           aria-hidden="true"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
//           />
//         </svg>
//         <span className="hidden sm:inline">Cart</span>
//         <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1.5 py-0.5 font-bold">
//           0
//         </span>
//       </button>
//     </header>
//   );
// }

function ProductCard({ image, title, price, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-black mb-2 flex-1">{title}</h3>
        <span className="text-black font-bold text-base">${price}</span>
        <button
          onClick={onAddToCart}
          className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductGrid({ products }) {
  const [showPopup, setShowPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null); // track which product was added
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(getCartFromStorage());
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    setCartToStorage(cart);
  }, [cart]);

  // Add product to cart (by id)
  function handleAddToCart(product) {
    setAddedProduct(product.title); // store product title for popup
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        // Increment quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  // Calculate total cart count
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              onAddToCart={() => handleAddToCart(product)} // pass product here
            />
          ))}
        </div>
      </main>

      {showPopup && addedProduct.toLowerCase().includes("chaewon") && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded shadow-lg z-50">
          Wonderful choice! Added {addedProduct} to cart!
        </div>
      )}

      {showPopup && !addedProduct.toLowerCase().includes("chaewon") && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded shadow-lg z-50">
          I would think again...
        </div>
      )}
    </>
  );
}
