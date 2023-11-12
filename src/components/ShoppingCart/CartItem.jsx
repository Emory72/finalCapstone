import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../contexts/ShoppingCartContext/ShoppingCartContext";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../apis/courseAPI";

export default function CartItem({ itemSelect, quantity }) {
  const { handleDeleteProductFromCart } = useShoppingCart();
  // const {
  //   data: courses = [],
  //   isLoading,
  //   error,
  // } = useQuery({ queryKey: ["courses"], queryFn: getCourses });
  // const itemSelect = courses.find((course) => course.maKhoaHoc === itemID);
  console.log(itemSelect);

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={itemSelect?.hinhAnh}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {itemSelect?.tenKhoaHoc}
          {/* {quantity > 1 && (
            <span className="text-muted fw-bold" style={{ fontSize: "18px" }}>
              x{quantity}
            </span>
          )} */}
        </div>
      </div>

      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => handleDeleteProductFromCart(itemSelect?.maKhoaHoc)}
      >
        &times;
      </Button>
    </Stack>
  );
}
