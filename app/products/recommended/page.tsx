import Header from "@/app/_components/Header";
import ProductItem from "@/app/_components/ProductItem";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    take: 20,
  });
  return (
    <>
      <Header />
      <div className="px5 py-6 ">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProductsPage;
