import React from "react";
import about1 from "../../../asset/images/about-1-1.jpg";
import { faFeather, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Page1() {
  return (
    <section className="about-two">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="about-two__content">
              <div className="block-title text-left">
                <h2 className="block-title__title">
                  Welcome to online <br />
                  learning center
                </h2>
              </div>
              <p className="about-two__text">
                There are many variations of passages of lorem ipsum available
                but the majority have suffered alteration in some form by
                injected humour or randomised words which don't look.
              </p>
              <div className="about-two__single-wrap">
                <div className="about-two__single">
                  <div className="about-two__single-icon">
                    <FontAwesomeIcon icon={faFeather} />
                  </div>
                  <div className="about-two__single-content">
                    <p className="about-two__single-text">
                      Start learning from our experts
                    </p>
                  </div>
                </div>
                <div className="about-two__single">
                  <div className="about-two__single-icon">
                    <FontAwesomeIcon icon={faLightbulb} />
                  </div>
                  <div className="about-two__single-content">
                    <p className="about-two__single-text">
                      Enhance your skills with us now
                    </p>
                  </div>
                </div>
              </div>
              <a href="#none" className="thm-btn">
                Learn More
              </a>
            </div>
          </div>
          <div className="col-xl-6 d-flex justify-content-xl-end justify-content-sm-center">
            <div className="about-two__image">
              <span className="about-two__image-dots"></span>
              <img src={about1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
