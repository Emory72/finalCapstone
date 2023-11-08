import React from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useUserContext();
  const location = useLocation();

  if (!currentUser) {
    //User chưa đăng nhập => redirect về trang login
    //Nếu đã đăng nhập thì trả về page mà trước đó user đang đứng (VD: đang ở trang ticket thì phải login )
    const url = `/sign-in?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  return children || Outlet;
}
