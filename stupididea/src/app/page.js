import fs from "fs";
import path from "path";
import ProductGrid from "./Products";

export default async function Page() {
  const imagesPath = path.join(process.cwd(), "public", "extracted_images");
  const files = fs
    .readdirSync(imagesPath)
    .filter(file => /\.(jpe?g|png|webp)$/i.test(file));

  const products = files.map((file, i) => {
    const isCustom = file.toLowerCase().includes("c");
    return {
      id: i + 1,
      image: `/extracted_images/${file}`,
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
