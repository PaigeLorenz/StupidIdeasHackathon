import Image from "next/image";
import fs from "fs";
import path from "path";

function ProductCard({ image, title, price }) {
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
        <h3 className="font-semibold text-lg mb-2 flex-1">{title}</h3>
        <span className="text-primary font-bold text-base">${price}</span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="w-full flex items-center justify-between py-6 px-4 sm:px-12 bg-white shadow-sm mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Shoply</h1>
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
          aria-hidden="true"
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
      title: isCustom ? file.split(".")[0] : "Tshirt",
      price: isCustom ? "35.00" : "20.00",
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
