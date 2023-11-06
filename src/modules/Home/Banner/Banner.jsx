import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import person1 from "../../../asset/images/slider-1-person-1.png";
import person2 from "../../../asset/images/slider-1-person-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import slidestrech from "../../../asset/images/slider-1-scratch.png";
import {
  faArrowRight,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

export default function Banner() {
  return (
    <div className="banner-wrapper">
      <section className="banner-one banner-carousel__one no-dots">
        <Swiper navigation={true} modules={[Navigation]}>
          <SwiperSlide>
            <div className="banner-one__slide banner-one__slide-one">
              <div className="container">
                <div className="banner-one__bubble-1"></div>
                <div className="banner-one__bubble-2"></div>
                <div className="banner-one__bubble-3"></div>
                <img src={slidestrech} alt="" className="banner-one__scratch" />
                <img src={person1} className="banner-one__person" alt="" />
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <h3 className="banner-one__title banner-one__light-color">
                      We Can <br />
                      Teach You
                    </h3>
                    <p className="banner-one__tag-line">
                      Are you ready to learn?
                    </p>
                    <a href="#" className="thm-btn banner-one__btn">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="banner-one__slide banner-one__slide-two">
              <div className="container">
                <div className="banner-one__bubble-1"></div>
                <div className="banner-one__bubble-2"></div>
                <div className="banner-one__bubble-3"></div>
                <img src={slidestrech} alt="" className="banner-one__scratch" />
                <img src={person2} className="banner-one__person" alt="" />
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <h3 className="banner-one__title banner-one__light-color">
                      We Can <br />
                      Teach You
                    </h3>
                    <p className="banner-one__tag-line">
                      Are you ready to learn?
                    </p>
                    <a href="#" className="thm-btn banner-one__btn">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <div className="banner-one__cta">
        <div className="banner-one__cta-icon">
          <a href="#">
            <FontAwesomeIcon icon={faGraduationCap} />
          </a>
        </div>
        <div className="banner-one__cta-title">
          <h3 className="banner-one__cta-text">
            <a href="#">Read how we encourage our students to learn</a>
          </h3>
        </div>
        <div className="banner-one__cta-link">
          <a href="#">
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </div>
    </div>
  );
}
