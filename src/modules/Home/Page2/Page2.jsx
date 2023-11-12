import React, { useState, useEffect } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../../../contexts/ShoppingCartContext/ShoppingCartContext";

export default function Page2() {
  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["courses"], queryFn: getCourses });

  const navigate = useNavigate();
  const { handleAddProducts, handleDeleteProductFromCart } = useShoppingCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const [search, setSearch] = useState("");
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setProductData(search);
    }, 300);
    return () => clearTimeout(timeOut);
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
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
          <div className="d-flex mb-5">
            <button className="header__search-btn me-3 " onClick={toggleSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            {isSearchOpen && (
              <input
                className="w-50"
                type="text"
                value={search}
                placeholder="Search..."
                onChange={handleSearch}
              />
            )}
          </div>

          <div className="course-one__carousel">
            <Swiper
              slidesPerView={3}
              spaceBetween={50}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              {courses
                ?.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.danhMucKhoaHoc.tenDanhMucKhoaHoc
                        .toLowerCase()
                        .includes(search);
                })
                .map((course) => (
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
                            <button
                              onClick={() => {
                                handleAddProducts(course.maKhoaHoc);
                              }}
                              className="plusCircle "
                            >
                              <FontAwesomeIcon icon={faPlusCircle} />
                            </button>
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
