import fs from "fs";
import path from "path";
import ProductGrid from "./Products";

export default async function Page() {
  const imagesPath = path.join(process.cwd(), "public", "extracted_images");
  const files = fs
    .readdirSync(imagesPath)
    .filter(file => /\.(jpe?g|png|webp)$/i.test(file));

  const products = files.map((file, i) => {
    const isCustom = file.toLowerCase().startsWith("c");
    return {
      id: i + 1,
      image: `/extracted_images/${file}`, // Served from /public
      title: isCustom ? "Chaewon! <3" : "Tshirt",
      price: isCustom ? "35.00" : "20.00",
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-geist-sans)]">
      <ProductGrid products={products} />
    </div>
  );
}



// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import path from "path";
// import ProductGrid from "../components/Products";
// import Header from "../components/header";


// function getProducts() {
//   if (typeof window === "undefined") {
//     const fs = require("fs")
//     const imagesPath = path.join(process.cwd(), "public", "extracted_images");
//     const files = fs
//       .readdirSync(imagesPath)
//       .filter(file => /\.(jpe?g|png|webp)$/i.test(file));;
    
//     const products = files.map((file, i) => {
//         const isCustom = file.toLowerCase().startsWith("c");
//         return {
//           id: i + 1,
//           image: `/extracted_images/${file}`, // Served from /public
//           title: isCustom ? "Chaewon! <3" : "Tshirt",
//           price: isCustom ? "35.00" : "20.00",
//         };
//       });
//     return products;
//   }
//   return [];
// }


// // Cart context helpers
// function getCartFromStorage() {
//   if (typeof window === "undefined") return [];
//   try {
//     const cart = localStorage.getItem("cart");
//     return cart ? JSON.parse(cart) : [];
//   } catch {
//     return [];
//   }
// }

// function setCartToStorage(cart) {
//   if (typeof window === "undefined") return;
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

// // Reusable ProductCard component
// function ProductCard({ image, title, price, onClick }) {
//   return (
//     <button
//       className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow text-left cursor-pointer"
//       onClick={onClick}
//       aria-label={`Add ${title} to cart`}
//       type="button"
//     >
//       <div className="relative w-full aspect-[4/3] bg-gray-100">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           style={{ objectFit: "cover" }}
//           sizes="(max-width: 768px) 100vw, 33vw"
//         />
//       </div>
//       <div className="p-4 flex flex-col flex-1">
//         <h3 className="font-semibold text-lg mb-2 flex-1">{title}</h3>
//         <span className="text-primary font-bold text-base">${price}</span>
//       </div>
//     </button>
//   );
// }

// // Example product data
// const products = [
//   {
//     id: 1,
//     image: "/products/shoes.jpg",
//     title: "Classic Sneakers",
//     price: "59.99",
//   },
//   {
//     id: 2,
//     image: "/products/headphones.jpg",
//     title: "Wireless Headphones",
//     price: "89.99",
//   },
//   {
//     id: 3,
//     image: "/products/backpack.jpg",
//     title: "Urban Backpack",
//     price: "39.99",
//   },
//   {
//     id: 4,
//     image: "/products/watch.jpg",
//     title: "Smart Watch",
//     price: "129.99",
//   },
//   {
//     id: 5,
//     image: "/products/sunglasses.jpg",
//     title: "Stylish Sunglasses",
//     price: "24.99",
//   },
//   {
//     id: 6,
//     image: "/products/jacket.jpg",
//     title: "Denim Jacket",
//     price: "74.99",
//   },
// ];

// export default function Home() {
//   const [cart, setCart] = useState([]);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     setCart(getCartFromStorage());
//   }, []);

//   // Update localStorage when cart changes
//   useEffect(() => {
//     setCartToStorage(cart);
//   }, [cart]);

//   // Add product to cart (by id)
//   function handleAddToCart(product) {
//     setCart((prevCart) => {
//       const existing = prevCart.find((item) => item.id === product.id);
//       if (existing) {
//         // Increment quantity
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         // Add new item
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   }

//   // Calculate total cart count
//   const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

//   const products = getProducts();

//   return (
//     <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-geist-sans)]">
//       <ProductGrid products={products} />
//     </div>
//   );
// }
