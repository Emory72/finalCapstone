import React from "react";
import { Link } from "react-router-dom";

export default function InnerBanner() {
  return (
    <section className="inner-banner">
      <div className="container">
        <ul className="list-unstyled thm-breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="active">
            <a href="#none">Courses</a>
          </li>
        </ul>
        <h2 className="inner-banner__title">Courses Details</h2>
      </div>
    </section>
  );
}
