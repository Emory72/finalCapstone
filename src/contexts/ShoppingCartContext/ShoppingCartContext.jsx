import { createContext, useContext, useState } from "react";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const cartQuantity = cartItems.reduce((quantity, item) => {
    return quantity + item.quantity;
  }, 0);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const handleAddProducts = (courseID) => {
    //Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const foundItem = cartItems.find((item) => item.id === courseID);
    if (foundItem) {
      //Sản phẩm đã tồn tại trong giỏ hàng-> tăng số lượng lên 1 đơn vị
      const newCart = cartItems.map((item) => {
        if (item.id === courseID) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(newCart);
    } else {
      //Sản phẩm chưa tồn tại trong giỏ hàng
      setCartItems([...cartItems, { courseID, quantity: 1 }]);
    }
  };
  const handleDeleteProductFromCart = (itemID) => {
    const newCarts = cartItems.filter((item) => item.id !== itemID);
    setCartItems(newCarts);
  };
  return (
    <ShoppingCartContext.Provider
      value={{
        handleAddProducts,
        handleDeleteProductFromCart,
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
