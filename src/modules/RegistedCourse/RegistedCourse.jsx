import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userInfo } from "../../apis/userAPI";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { cancelCourse } from "../../apis/courseAPI";
import { useUserContext } from "../../contexts/UserContext/UserContext";

export default function RegistedCourse() {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: userInfo,
  });
  console.log(data);

  const { mutate: handleCancelCourse } = useMutation({
    mutationFn: (maKhoaHoc) =>
      cancelCourse({
        maKhoaHoc,
        taiKhoan: currentUser.taiKhoan,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });
  return (
    <div>
      <section className="inner-banner">
        <div className="container">
          <ul className="list-unstyled thm-breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="active">
              <a href="#">Registed Courses</a>
            </li>
          </ul>
          <h2 className="inner-banner__title">Registed Courses</h2>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row py-5 ">
            {data?.chiTietKhoaHocGhiDanh.map((course) => (
              <div className="col-xl-4 lg-6 sm-12 rounded ">
                <div className="course-one__single  shadow">
                  <div className="course-one__image">
                    <img src={course.hinhAnh} height={260} />
                  </div>
                  <div className="course-one__content">
                    <div className="course-one__admin">
                      <FontAwesomeIcon
                        className="userIcon"
                        icon={faCircleUser}
                      />
                    </div>
                    <h2 className="course-one__title">
                      <a href="/">{course.tenKhoaHoc}</a>
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
                    <button
                      onClick={() => handleCancelCourse(course.maKhoaHoc)}
                      className="course-one__link border-0"
                    >
                      Cancel Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
