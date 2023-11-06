import React, { useState } from "react";
import Banner from "./Banner/Banner";
import Page2 from "./Page2/Page2";
import Page1 from "./Page1/Page1";
import Video from "./Video/Video";
import Footer from "../../components/Footer/Footer";
import CourseCatOne from "./CourseCatOne/CourseCatOne";
import Header from "../../components/Header/Header";

export default function Home() {
  return (
    <div>
      <Banner />
      <Page1 />
      <Page2 />
      <Video />
      <CourseCatOne />
      <Footer />
    </div>
  );
}
