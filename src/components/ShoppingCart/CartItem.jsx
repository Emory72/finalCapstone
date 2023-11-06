import React from "react";
import { useShoppingCart } from "../../contexts/ShoppingCartContext/ShoppingCartContext";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../apis/courseAPI";
import { Stack } from "react-bootstrap";
export default function CartItem({ itemID, quantity }) {
  const { removeFromCart } = useShoppingCart();
  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["courses"], queryFn: getCourses });

  const item = courses.find((course) => course.maKhoaHoc === itemID);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={item.hinhAnh} width={50} height={50} />
      <div className="me-auto">
        <div>
          {item.tenKhoaHoc}
          {quantity > 1 && ` x ${quantity}`}
        </div>
        <button
          className="btn btn-danger"
          onClick={() => removeFromCart(item.maKhoaHoc)}
        >
          X
        </button>
      </div>
    </Stack>
  );
}
