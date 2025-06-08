"use client";

import { useState } from "react";
import Image from "next/image";

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

function Header() {
  return (
    <header className="w-full flex items-center justify-between py-6 px-4 sm:px-12 bg-white shadow-sm mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Buyewon</h1>
      <button
        className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
        aria-label="View cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
          />
        </svg>
        <span className="hidden sm:inline">Cart</span>
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1.5 py-0.5 font-bold">
          0
        </span>
      </button>
    </header>
  );
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
  const [showPopup, setShowPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [nonChaewonCount, setNonChaewonCount] = useState(0);
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [riddleIndex, setRiddleIndex] = useState(null);

  const currentRiddle = riddleIndex !== null ? riddles[riddleIndex] : null;

  const handleAddToCart = (product) => {
    setAddedProduct(product);
    setShowPopup(true);
    setRiddleAnswer("");

    if (product.title.toLowerCase().includes("chaewon")) {
      setNonChaewonCount(0);
      setTimeout(() => setShowPopup(false), 1500);
    } else {
      setRiddleIndex(null);
    }
  };

  const cancelNonChaewonAdd = () => {
    setShowPopup(false);
    setRiddleAnswer("");
    setNonChaewonCount(0);
    setRiddleIndex(null);
  };

  const confirmNonChaewonAdd = () => {
    if (nonChaewonCount >= 2 && currentRiddle) {
      if (riddleAnswer.trim().toLowerCase().includes(currentRiddle.correct.toLowerCase())) {
        alert(`Added ${addedProduct.title} to cart!`);
        setShowPopup(false);
        setRiddleAnswer("");
        setNonChaewonCount(0);
        setRiddleIndex(null);
      } else {
        alert("Wrong answer! Try again or cancel.");
      }
    } else {
      setNonChaewonCount((c) => c + 1);
      setRiddleIndex(Math.floor(Math.random() * riddles.length));
    }
  };

  const renderPopupContent = () => {
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
  };

  return (
    <>
      <Header />
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
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">{children}</div>
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
