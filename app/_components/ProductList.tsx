import { Prisma } from "@prisma/client";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: { restaurant: { select: { name: true } } };
  }>[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-16 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
