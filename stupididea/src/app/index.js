import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const imagesDir = path.join(process.cwd(), 'extracted_images');
  const filenames = fs.readdirSync(imagesDir);

  const products = filenames
    .filter(name => /\.(jpe?g|png|webp)$/i.test(name)) // only image files
    .map(name => {
      const isCustom = name.startsWith('c');

      return {
        title: isCustom ? name.split('.')[0] : 'Tshirt',
        image: `/images/${name}`,
        price: isCustom ? '$35' : '$20', // or some fallback custom value
      };
    });

  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {products.map((product, i) => (
        <div key={i} className="border rounded p-4">
          <img src={product.image} alt={product.title} className="w-full h-auto" />
          <h2 className="text-xl mt-2">{product.title}</h2>
          <p className="text-lg text-gray-600">{product.price}</p>
        </div>
      ))}
    </div>
  );
}
