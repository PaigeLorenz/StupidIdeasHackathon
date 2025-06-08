"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/header";

// Cart helpers (duplicated from /page.js for isolation)
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

// Cart item row with decrement button
function CartItem({ image, title, price, quantity, onDecrement }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <div className="relative w-20 h-16 flex-shrink-0 bg-gray-100 rounded">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          sizes="80px"
          className="rounded"
        />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          Qty: {quantity}
          <button
            type="button"
            aria-label={`Remove one ${title}`}
            onClick={onDecrement}
            className="ml-2 px-2 py-0.5 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs"
          >
            −
          </button>
        </div>
      </div>
      <div className="font-bold text-gray-900">
        ${(parseFloat(price) * quantity).toFixed(2)}
      </div>
    </div>
  );
}

// Shipping & Billing Form
function CheckoutForm({ formRef }) {
  return (
    <form
      ref={formRef}
      id="checkout"
      className="bg-white rounded-lg shadow-md p-6 mt-8 space-y-6 relative"
      style={{ zIndex: 1 }}
    >
      <h2 className="text-lg font-semibold mb-4 text-black">
        Shipping Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="shippingFirstName"
            autoComplete="given-name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="shippingLastName"
            autoComplete="family-name"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="shippingAddress"
            autoComplete="street-address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="shippingCity"
            autoComplete="address-level2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="shippingPostal"
            autoComplete="postal-code"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="shippingCountry"
            autoComplete="country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="shippingPhone"
            autoComplete="tel"
          />
        </div>
      </div>
      <h2 className="text-lg font-semibold mt-8 mb-4 text-black">
        Billing Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="cardNumber"
            autoComplete="cc-number"
            maxLength={19}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="cardExpiry"
            autoComplete="cc-exp"
            maxLength={5}
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVC
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="cardCvc"
            autoComplete="cc-csc"
            maxLength={4}
            placeholder="CVC"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name on Card
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            name="cardName"
            autoComplete="cc-name"
          />
        </div>
      </div>
    </form>
  );
}

function CartSummary({ items }) {
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 7.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-700 mb-2">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2 mt-2">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

// Purchase confirmation popup
function PurchasePopup({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">
          You made successfully made a purchase :/
        </h2>
        <p className="mb-6">Reflect on your choices.</p>
        <button
          className="px-6 py-2 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

const CHAOS_STEPS = [
  // Each step is a style transform or class
  {
    style: { transform: "scale(0.01)", left: "0", top: "0" },
    className: "transition-all duration-300",
  }, // tiny
  {
    style: {
      position: "relative",
      transform: "scale(0.5)",
      left: "0",
      top: "0",
    },
    className: "transition-all duration-300",
  }, // normal
  {
    style: {
      position: "relative",
      transform: "scale(0.5)",
      left: "200px",
      top: "0",
    },
    className: "transition-all duration-300",
  }, // move left
  {
    style: {
      position: "relative",
      transform: "scale(0.5)",
      left: "400px",
      top: "0",
    },
    className: "transition-all duration-300",
  }, // move left more
  {
    style: {
      position: "static",
      transform: "scale(0.1) translateY(-40px)",
      left: "20px",
      top: "0",
    },
    className: "animate-bounce transition-all duration-300",
  }, // bounce
  {
    style: { opacity: 0.03, left: "20px", top: "0" },
    className: "transition-all duration-300",
  }, // barely visible
  {
    style: { opacity: 0.03, left: "20px", top: "0" },
    className: "transition-all duration-300",
  }, // barely visible
];

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [chaosStep, setChaosStep] = useState(0);
  const [chaosActive, setChaosActive] = useState(false);
  const buyNowBtnRef = useRef(null);
  const formRef = useRef(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(getCartFromStorage());
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    setCartToStorage(cart);
  }, [cart]);

  // Decrement handler
  function handleDecrement(id) {
    setCart((prevCart) => {
      const found = prevCart.find((item) => item.id === id);
      if (!found) return prevCart;
      if (found.quantity <= 1) {
        // Remove item
        return prevCart.filter((item) => item.id !== id);
      } else {
        // Decrement quantity
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  }

  // Check for "chaewon" in any product title (case-insensitive)
  const hasChaewon = cart.some((item) =>
    item.title.toLowerCase().includes("chaewon")
  );

  // Buy Now button click handler
  function handleBuyNow(e) {
    e.preventDefault();
    // if (hasChaewon) {
    //   setShowPopup(true);
    //   setChaosStep(0);
    //   setChaosActive(false);
    //   return;
    // }
    if (hasChaewon) {
      window.location.href = "/chaewon";
      return;
    }
    // If not, start chaos sequence
    if (chaosStep < CHAOS_STEPS.length - 1) {
      setChaosActive(true);
      setChaosStep((prev) => prev + 1);
    } else {
      setShowPopup(true);
      setChaosStep(0);
      setChaosActive(false);
    }
  }

  // Reset chaos when popup closes
  function handleClosePopup() {
    setShowPopup(false);
    setChaosStep(0);
    setChaosActive(false);
  }

  // For hiding the button behind shipping info, position absolutely over the form
  let buyNowBtnStyle = {};
  let buyNowBtnClass =
    "w-full mt-8 py-3 px-6 rounded-full bg-black text-white font-bold text-lg hover:bg-gray-800 transition-colors shadow-md";
  if (!hasChaewon && chaosActive && chaosStep > 0) {
    const chaos = CHAOS_STEPS[chaosStep - 1] || {};
    buyNowBtnStyle = { ...chaos.style };
    buyNowBtnClass += " " + (chaos.className || "");
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-geist-sans)] relative">
      <Header
        cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
      />
      <main className="max-w-2xl mx-auto px-4 sm:px-8 py-4 relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Cart</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {cart.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              Your cart is empty.
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onDecrement={() => handleDecrement(item.id)}
                />
              ))}
            </div>
          )}
        </div>
        <CartSummary items={cart} />
        <div className="relative" style={{ minHeight: "60px" }}>
          <CheckoutForm formRef={formRef} />
          {/* Buy Now button, possibly bouncing/hidden/chaotic */}
          {cart.length > 0 && (
            <button
              ref={buyNowBtnRef}
              type="submit"
              form="checkout"
              className={buyNowBtnClass}
              style={buyNowBtnStyle}
              onClick={handleBuyNow}
              tabIndex={buyNowBtnStyle.opacity === 0 ? -1 : 0}
            >
              Buy Now
            </button>
          )}
        </div>
        <PurchasePopup open={showPopup} onClose={handleClosePopup} />
      </main>
    </div>
  );
}
