"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_context/Cart";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useContext } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CANCELED:
      return "Cancelado";
    case OrderStatus.CONFIRMED:
      return "Em andamento";
    case OrderStatus.COMPLETED:
      return "Entregue";
    case OrderStatus.DELIVERING:
      return "Em transporte";
    case OrderStatus.PREPARING:
      return "Preparando";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();
  const handleRedoOrderClick = () => {
    for (const product of order.products) {
      addProductToCart({
        product: { ...product.product, restaurant: order.restaurant },
        quantity: product.quantity,
      });
    }
    router.push(`/restaurantes/${order.restaurantId}`);
  };
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div
          className={`w-fit rounded-full bg-[#EEEEEE] bg-muted px-2 py-1 text-muted-foreground ${order.status !== OrderStatus.COMPLETED && "bg-green-500 text-white"}`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={order.restaurant.imageUrl}
                alt={order.restaurant.name}
              />
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-5 w-5">
            <ChevronRightIcon />
          </Button>
        </div>
        <div className="py-3">
          <Separator />
        </div>
        <div>
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
                <span className="text-xs text-muted-foreground">
                  {product.product.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="py-3">
          <Separator />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="ghost"
            className="text-primary"
            disabled={order.status !== OrderStatus.COMPLETED}
            onClick={handleRedoOrderClick}
          >
            Refazer pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
