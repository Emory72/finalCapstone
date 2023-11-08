import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../contexts/ShoppingCartContext/ShoppingCartContext";
import CartItem from "./CartItem";
export default function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem
              key={item.courseID}
              courseID={item.courseID}
              quantity={item.quantity}
            />
          ))}
          <button className="btn btn-primary">Checkout</button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
