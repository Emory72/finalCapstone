import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../contexts/ShoppingCartContext/ShoppingCartContext";
import CartItem from "./CartItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourses } from "../../apis/courseAPI";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { checkoutAPI } from "../../apis/courseAPI";
import ProtectedRoute from "../../routers/ProtectedRoute/ProtectedRoute";
import { useNavigate } from "react-router-dom";
export default function ShoppingCart({ isOpen }) {
  const queryClient = useQueryClient();
  const { currentUser } = useUserContext();
  const { closeCart, cartItems } = useShoppingCart();
  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["courses"], queryFn: getCourses });
  const courseIDs = cartItems.map((item) => item.itemID);
  const itemSelect = courses.filter((course) =>
    courseIDs.includes(course.maKhoaHoc)
  );

  const { mutate: handleCheckOut } = useMutation({
    mutationFn: async (maKhoaHocList) => {
      const checkoutPromises = maKhoaHocList.map(async (maKhoaHoc) => {
        await checkoutAPI({
          maKhoaHoc,
          taiKhoan: currentUser.taiKhoan,
        });
      });

      // Wait for all cancellations to complete before moving on
      await Promise.all(checkoutPromises);
    },
    onSuccess: () => {
      alert("Success alert—check it out!");
      queryClient.invalidateQueries({ queryKey: "getCourses" });
    },
  });


  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3} itemSelect={itemSelect}>
          {itemSelect.map((item) => (
            <CartItem key={item.maKhoaHoc} itemSelect={item} />
          ))}

          <button
            onClick={() => handleCheckOut(courseIDs)}
            className="btn btn-primary"
          >
            Check Out
          </button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
