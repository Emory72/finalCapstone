import React from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

export default function UserLayout() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
    </div>
  );
}
