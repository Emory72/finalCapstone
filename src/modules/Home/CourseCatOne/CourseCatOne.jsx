import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faStar } from "@fortawesome/free-solid-svg-icons";
import { getCourseCat } from "../../../apis/courseAPI";
import { getCourseByCat } from "../../../apis/courseAPI";
export default function CourseCatOne() {
  const {
    data: courseCat = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["courseCat"], queryFn: getCourseCat });

  const [categoryID, setCategoryID] = useState([]);
  const handleGetCategory = (categoryID) => {
    setCategoryID(categoryID);
  };
  const { data = [] } = useQuery({
    queryKey: ["CourseByCat", categoryID],
    queryFn: () => getCourseByCat(categoryID),
    enabled: !!categoryID,
    refetchOnWindowFocus: false,
  });

  console.log(data);

  useEffect(() => {
    if (courseCat.length > 0) {
      handleGetCategory(courseCat[0].maDanhMuc);
    }
  }, [courseCat]);

  const navigate = useNavigate();
  return (
    <section className="bg-light course-category-one">
      <div className="container-fluid text-center">
        <div className="block-title text-center">
          <h1 className="block-title__title">
            Browse online <br />
            course categories
          </h1>
        </div>

        <div className="">
          <Tabs
            defaultActiveKey="1"
            centered
            onTabClick={(key) => handleGetCategory(courseCat[key].maDanhMuc)}
          >
            {courseCat.map((cat, index) => (
              <Tabs.TabPane tab={cat.tenDanhMuc} key={index.toString()}>
                <div className="row">
                  {data.map((course, index) => (
                    <div className="col-xl-4 lg-6 sm-12">
                      <div className="course-one__single">
                        <div className="course-one__image">
                          <img src={course.hinhAnh} height={260} />
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
                          <button
                            onClick={() =>
                              navigate(`/course/${course.maKhoaHoc}`)
                            }
                            className="course-one__link border-0"
                          >
                            Course Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
