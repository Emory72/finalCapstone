import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { getCourses } from "../../../apis/courseAPI";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faStar,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../../../contexts/ShoppingCartContext/ShoppingCartContext";

export default function Page2() {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["courses"], queryFn: getCourses });

  const navigate = useNavigate();

  const quantity = getItemQuantity(courses.maKhoaHoc);

  return (
    <div>
      <section className="course-one__top-title home-one">
        <div className="container">
          <div className="block-title mb-0">
            <h2 className="block-title__title">
              Explore our <br />
              popular courses
            </h2>
          </div>
        </div>
        <div className="course-one__top-title__curve"></div>
      </section>

      <section className="course-one course-one__teacher-details home-one">
        <div className="container">
          <div className="course-one__carousel">
            <Swiper
              slidesPerView={3}
              spaceBetween={50}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              {courses?.map((course) => (
                <SwiperSlide className="item" key={course.maKhoaHoc}>
                  <div className="course-one__single color-1">
                    <div className="course-one__image">
                      <img src={course.hinhAnh} height={400} />
                    </div>
                    <div className="course-one__content">
                      <a href="#" className="course-one__category">
                        {course.danhMucKhoaHoc.maDanhMucKhoahoc}
                      </a>
                      <div className="course-one__admin">
                        <FontAwesomeIcon
                          className="userIcon"
                          icon={faCircleUser}
                        />
                        <span>by {course.nguoiTao.taiKhoan}</span>
                      </div>
                      <h2 className="course-one__title">
                        <a href="/">
                          {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                        </a>
                      </h2>
                      <div className="course-one__stars">
                        <span className="course-one__stars-wrap">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                        </span>
                        <span className="course-one__stars-count">
                          {course.luotXem} View
                        </span>
                      </div>
                      <div className="course-one__meta">
                        <div>{course.moTa}</div>
                      </div>
                      <div className="d-flex align-items-center flex-column">
                        <button
                          onClick={() =>
                            navigate(`/course/${course.maKhoaHoc}`)
                          }
                          className="course-one__link border-0"
                        >
                          Course Details
                        </button>
                        <div className="mt-auto">
                          {quantity === 0 ? (
                            <button
                              onClick={() =>
                                increaseCartQuantity(course.maKhoaHoc)
                              }
                              className="plusCircle "
                            >
                              <FontAwesomeIcon icon={faPlusCircle} />
                            </button>
                          ) : (
                            <div
                              className="d-flex align-items-center flex-column mt-2"
                              style={{ gap: ".5rem" }}
                            >
                              <div>
                                <FontAwesomeIcon
                                  onClick={() =>
                                    decreaseCartQuantity(course.maKhoaHoc)
                                  }
                                  icon={faMinusCircle}
                                  className="fs-4"
                                  style={{ color: "rgb(230, 120, 24)" }}
                                />

                                <span className="fs-5 p-3 ">
                                  {quantity} in cart
                                </span>
                                <FontAwesomeIcon
                                  onClick={() =>
                                    increaseCartQuantity(course.maKhoaHoc)
                                  }
                                  icon={faPlusCircle}
                                  className="fs-4"
                                  style={{ color: "rgb(230, 120, 24)" }}
                                />
                              </div>
                              <button
                                onClick={() => removeFromCart(course.maKhoaHoc)}
                                className="btn btn-danger"
                              >
                                remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}
