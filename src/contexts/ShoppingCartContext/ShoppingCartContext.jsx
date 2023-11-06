import { createContext, useContext, useState } from "react";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  function getItemQuantity(itemID) {
    return cartItems.find((item) => item.id === itemID)?.quantity || 0;
  }

  function increaseCartQuantity(itemID) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === itemID) == null) {
        return [...currItems, { itemID, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === itemID) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(itemID) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === itemID)?.quantity === 1) {
        return currItems.filter((item) => item.id !== itemID);
      } else {
        return currItems.map((item) => {
          if (item.id === itemID) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(itemID) {
    console.log("removeFromCart", itemID);
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== itemID);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
