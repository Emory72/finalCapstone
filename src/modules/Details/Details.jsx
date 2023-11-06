import React from "react";
import { useParams } from "react-router-dom";
import InnerBanner from "./InnerBanner/InnerBanner";
import CourseDetails from "./CourseDetails/CourseDetails";

export default function Details() {
  const { courseID } = useParams();

  return (
    <div>
      <InnerBanner />
      <CourseDetails courseID={courseID} />
    </div>
  );
}
