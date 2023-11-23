import React from "react";
import { getCourseDetails, checkoutAPI } from "../../../apis/courseAPI";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalf,
  faHeart,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../../contexts/UserContext/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function CourseDetails({ courseID }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["courseDetails", courseID],
    queryFn: () => getCourseDetails(courseID),
    enabled: !!courseID,
  });
  const { currentUser } = useUserContext();
  const { mutate: handleCheckOut } = useMutation({
    mutationFn: (maKhoaHoc) =>
      checkoutAPI({
        maKhoaHoc,
        taiKhoan: currentUser.taiKhoan,
      }),
    onSuccess: () => {
      alert("Success alert — check it out!");
      navigate("/registedCourse");
    },
    onError: () => {
      alert("Fail alert — Please sign in to register courses!");
      navigate("/sign-in");
    },
  });
  return (
    <section className="course-details">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="course-details__content">
              <p className="course-details__author">
                <FontAwesomeIcon icon={faCircleUser} />
                by <a href="/">{data?.nguoiTao.taiKhoan}</a>
              </p>

              <div className="course-details__top">
                <div className="course-details__top-left">
                  <h2 className="course-details__title">{data?.tenKhoaHoc}</h2>
                  <div className="course-one__stars">
                    <span className="course-one__stars-wrap">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </span>

                    <span className="course-one__stars-count">
                      {data?.luotXem} Views
                    </span>
                  </div>
                </div>
                <div className="course-details__top-right">
                  <a href="#" className="course-one__category">
                    {data?.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                  </a>
                </div>
              </div>
              <div className="course-one__image">
                <img src={data?.hinhAnh} alt="" />
                <FontAwesomeIcon icon={faHeart} />
              </div>

              <ul className="course-details__tab-navs list-unstyled nav nav-tabs">
                <li>
                  <a
                    className="active"
                    role="tab"
                    data-toggle="tab"
                    href="#overview"
                  >
                    Overview
                  </a>
                </li>

                <li>
                  <a className="" role="tab" data-toggle="tab" href="#review">
                    Reviews
                  </a>
                </li>
              </ul>
              <div className="tab-content course-details__tab-content ">
                <div
                  className="tab-pane show active  animated fadeInUp"
                  role="tabpanel"
                  id="overview"
                >
                  <p className="course-details__tab-text">{data?.moTa}</p>
                </div>

                <div
                  className="tab-pane  animated fadeInUp"
                  role="tabpanel"
                  id="review"
                >
                  <div className="row">
                    <div className="col-xl-7 d-flex">
                      <div className="course-details__progress my-auto">
                        <div className="course-details__progress-item">
                          <p className="course-details__progress-text">
                            Excellent
                          </p>
                          <div className="course-details__progress-bar">
                            <span style={{ width: `95%` }}></span>
                          </div>
                          <p className="course-details__progress-count">5</p>
                        </div>
                        <div className="course-details__progress-item">
                          <p className="course-details__progress-text">
                            Very Good
                          </p>
                          <div className="course-details__progress-bar">
                            <span style={{ width: `65%` }}></span>
                          </div>
                          <p className="course-details__progress-count">2</p>
                        </div>
                        <div className="course-details__progress-item">
                          <p className="course-details__progress-text">
                            Average
                          </p>
                          <div className="course-details__progress-bar">
                            <span style={{ width: `33%` }}></span>
                          </div>
                          <p className="course-details__progress-count">1</p>
                        </div>
                        <div className="course-details__progress-item">
                          <p className="course-details__progress-text">Poor</p>
                          <div className="course-details__progress-bar">
                            <span
                              style={{ width: `0%` }}
                              className="no-bubble"
                            ></span>
                          </div>
                          <p className="course-details__progress-count">0</p>
                        </div>
                        <div className="course-details__progress-item">
                          <p className="course-details__progress-text">
                            Terrible
                          </p>
                          <div className="course-details__progress-bar">
                            <span
                              style={{ width: `0%` }}
                              className="no-bubble"
                            ></span>
                          </div>
                          <p className="course-details__progress-count">0</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5 justify-content-xl-end justify-content-sm-center d-flex">
                      <div className="course-details__review-box">
                        <p className="course-details__review-count">4.6</p>
                        <div className="course-details__review-stars">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStarHalf} />
                        </div>
                        <p className="course-details__review-text">
                          30 reviews
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="course-details__comment">
                    <div className="course-details__comment-single">
                      <div className="course-details__comment-top">
                        <div className="course-details__comment-img">
                          <img
                            src="https://cybersoft.edu.vn/wp-content/uploads/2022/08/VuTuan.jpg"
                            alt=""
                          />
                        </div>
                        <div className="course-details__comment-right">
                          <h2 className="course-details__comment-name"></h2>
                          <div className="course-details__comment-meta">
                            <p className="course-details__comment-date">
                              26 July, 2019
                            </p>
                            <div className="course-details__comment-stars">
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStarHalf} />
                              <FontAwesomeIcon icon={faStarHalf} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="course-details__comment-single">
                      <div className="course-details__comment-top">
                        <div className="course-details__comment-img">
                          <img
                            src="https://cybersoft.edu.vn/wp-content/uploads/2022/08/tranvantuyen.jpg"
                            alt=""
                          />
                        </div>
                        <div className="course-details__comment-right">
                          <h2 className="course-details__comment-name">
                            Trần Văn Tuyên
                          </h2>
                          <div className="course-details__comment-meta">
                            <p className="course-details__comment-date">
                              26 July, 2019
                            </p>
                            <div className="course-details__comment-stars">
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStarHalf} />
                              <FontAwesomeIcon icon={faStarHalf} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form action="#" className="course-details__comment-form">
                    <h2 className="course-details__title">Add a review</h2>
                    <p className="course-details__comment-form-text">
                      Rate this Course?{" "}
                      <a href="#give-star" aria-label="review stars">
                        <FontAwesomeIcon icon={faStar} />
                      </a>
                      <a href="#give-star" aria-label="review stars">
                        <FontAwesomeIcon icon={faStar} />
                      </a>
                      <a href="#give-star" aria-label="review stars">
                        <FontAwesomeIcon icon={faStar} />
                      </a>
                      <a href="#give-star" aria-label="review stars">
                        <FontAwesomeIcon icon={faStar} />
                      </a>
                      <a href="#give-star" aria-label="review stars">
                        <FontAwesomeIcon icon={faStar} />
                      </a>
                    </p>
                    <div className="row">
                      <div className="col-lg-6">
                        <input type="text" placeholder="Your Name" />
                        <input type="text" placeholder="Email Address" />
                      </div>
                      <div className="col-lg-12">
                        <textarea placeholder="Write Message"></textarea>
                        <button
                          type="submit"
                          className="thm-btn course-details__comment-form-btn"
                        >
                          Leave a Review
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="course-details__price">
              <p className="course-details__price-text">Learn This Course</p>

              <a
                onClick={() => handleCheckOut(data.maKhoaHoc)}
                className="thm-btn course-details__price-btn"
              >
                Register in Course
              </a>
            </div>

            <div className="course-details__list">
              <h2 className="course-details__list-title">New Courses</h2>
              <div className="course-details__list-item">
                <div className="course-details__list-img">
                  <img
                    src="https://cybersoft.edu.vn/wp-content/svgimages/illustration/illustration_12-2.svg"
                    alt=""
                  />
                </div>
                <div className="course-details__list-content">
                  <a className="course-details__list-author" href="#none">
                    by <span>Lydia Byrd</span>
                  </a>
                  <h3>
                    <a href="#none">Marketing strategies</a>
                  </h3>
                  <div className="course-details__list-stars">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
              <div className="course-details__list-item">
                <div className="course-details__list-img">
                  <img
                    src="https://cybersoft.edu.vn/wp-content/svgimages/illustration/illustration_14.svg"
                    alt=""
                  />
                </div>
                <div className="course-details__list-content">
                  <a className="course-details__list-author" href="#none">
                    by <span>Lydia Byrd</span>
                  </a>
                  <h3>
                    <a href="#none">Marketing strategies</a>
                  </h3>
                  <div className="course-details__list-stars">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
              <div className="course-details__list-item">
                <div className="course-details__list-img">
                  <img
                    src="https://cybersoft.edu.vn/wp-content/svgimages/illustration/illustration_1.svg"
                    alt=""
                  />
                </div>
                <div className="course-details__list-content">
                  <a className="course-details__list-author" href="#none">
                    by <span>Lydia Byrd</span>
                  </a>
                  <h3>
                    <a href="#none">Marketing strategies</a>
                  </h3>
                  <div className="course-details__list-stars">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
