import { useState, createContext, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Sau khi user sign in onSuccess thì data lưu lên storage và trả ra ở đây dùng để hiển thị lại cho các page khác
    const user = JSON.parse(localStorage.getItem("currentUser"));

    return user || null;
  });
  const handleSignin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const handleSignout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    // 3 value trong provider share cho toàn App, và page nào cũng có thể lấy để sử dụng
    <UserContext.Provider value={{ currentUser, handleSignin, handleSignout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const value = useContext(UserContext);
  return value;
};

export default UserProvider;
