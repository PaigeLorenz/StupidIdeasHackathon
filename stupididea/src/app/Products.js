"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/header";

const riddles = [
  { question: "What has keys but can't open locks?", correct: "piano" },
  { question: "What runs but never walks?", correct: "water" },
  { question: "I speak without a mouth and hear without ears. What am I?", correct: "echo" },
  { question: "What has to be broken before you can use it?", correct: "egg" },
  { question: "What month of the year has 28 days?", correct: "all" },
  { question: "I’m tall when I’m young, and I’m short when I’m old. What am I?", correct: "candle" },
  { question: "I am an odd number. Take away a letter and I become even. What number am I?", correct: "seven" },
  { question: "What tastes better than it smells?", correct: "tongue" },
];

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
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [nonChaewonCount, setNonChaewonCount] = useState(0);
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [riddleIndex, setRiddleIndex] = useState(null);

  const currentRiddle = riddleIndex !== null ? riddles[riddleIndex] : null;

  useEffect(() => {
    setCart(getCartFromStorage());
  }, []);

  useEffect(() => {
    setCartToStorage(cart);
  }, [cart]);

  function handleAddToCart(product) {
    if (product.title.toLowerCase().includes("chaewon")) {
      setCart((prevCart) => addProductToCart(prevCart, product));
      setAddedProduct(product);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1500);
    } else {
      setAddedProduct(product);
      setShowPopup(true);
      setNonChaewonCount(0);
      setRiddleAnswer("");
      setRiddleIndex(null);
    }
  }

  function addProductToCart(prevCart, product) {
    const existing = prevCart.find((item) => item.id === product.id);
    if (existing) {
      return prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  }

  function cancelNonChaewonAdd() {
    setShowPopup(false);
    setAddedProduct(null);
    setRiddleAnswer("");
    setNonChaewonCount(0);
    setRiddleIndex(null);
  }

  function confirmNonChaewonAdd() {
    if (!addedProduct) return;

    if (nonChaewonCount === 0) {
      // First "Are you sure?" confirmation
      setNonChaewonCount(1);
    } else if (nonChaewonCount === 1) {
      // Second "Are you sure you're sure?" confirmation
      setNonChaewonCount(2);
      // Immediately set a riddle when count hits 2
      setRiddleIndex(Math.floor(Math.random() * riddles.length));
    } else if (nonChaewonCount === 2) {
      // Now riddle is shown, check answer
      if (!currentRiddle) {
        // Defensive fallback: if no riddle set, set one
        setRiddleIndex(Math.floor(Math.random() * riddles.length));
        return;
      }
  
      const isCorrect = riddleAnswer.trim().toLowerCase().includes(currentRiddle.correct.toLowerCase());
      if (isCorrect) {
        // Add product to cart, reset everything
        setCart((prevCart) => addProductToCart(prevCart, addedProduct));
        setShowPopup(false);
        setAddedProduct(null);
        setRiddleAnswer("");
        setNonChaewonCount(0);
        setRiddleIndex(null);
      } else {
        alert("Wrong answer! Try again or cancel.");
      }
    }
  }

  function renderPopupContent() {
    if (!addedProduct) return null;

    if (addedProduct.title.toLowerCase().includes("chaewon")) {
      return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded shadow-lg z-50">
          Wonderful choice! Added <strong>{addedProduct.title}</strong> to cart!
        </div>
      );
    }

    if (nonChaewonCount === 0) {
      return (
        <Modal>
          <p className="mb-6 text-xl text-black font-semibold">Are you sure?</p>
          <Actions onCancel={cancelNonChaewonAdd} onYes={confirmNonChaewonAdd} />
        </Modal>
      );
    }

    if (nonChaewonCount === 1) {
      return (
        <Modal>
          <p className="mb-6 text-xl text-black font-semibold">Are you sure you're sure?</p>
          <Actions onCancel={cancelNonChaewonAdd} onYes={confirmNonChaewonAdd} />
        </Modal>
      );
    }

    if (nonChaewonCount >= 2 && currentRiddle) {
      return (
        <Modal>
          <p className="mb-4 text-black font-semibold">If you're really sure, solve this riddle...</p>
          <p className="mb-4 text-black text-center">{currentRiddle.question}</p>
          <input
            type="text"
            value={riddleAnswer}
            onChange={(e) => setRiddleAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="px-3 py-2 border border-gray-300 rounded w-64 text-black mb-4 mx-auto block"
          />
          <div className="flex gap-4 justify-center">
            <button
              onClick={confirmNonChaewonAdd}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
            <button
              onClick={cancelNonChaewonAdd}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </Modal>
      );
    }

    return null;
  }

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
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </main>
      {showPopup && renderPopupContent()}
    </>
  );
}

function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        {children}
      </div>
    </div>
  );
}

function Actions({ onCancel, onYes }) {
  return (
    <div className="flex justify-center gap-4">
      <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
        Cancel
      </button>
      <button onClick={onYes} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Yes
      </button>
    </div>
  );
}
