"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from ".././_actions/search";
import Header from "../../_components/Header";
import RestaurantItem from "../../_components/RestaurantItem";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) {
        return;
      }
      const response = await searchForRestaurant(searchFor);
      setRestaurants(response);
    };
    fetchRestaurants();
  }, [searchParams]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px5 py-6 ">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
