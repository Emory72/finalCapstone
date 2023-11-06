import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
export default function Video() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <section className="video-two">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="video-two__content">
              <h2 className="video-two__title">
                Cybersoft Learning <br />
                mission is to extend <br />
                your knowledge base
              </h2>
              <a href="#none" className="thm-btn">
                Learn More
              </a>
            </div>
          </div>
          <div className="col-lg-5 d-flex justify-content-lg-end justify-content-sm-start">
            <div className="my-auto">
              <ModalVideo
                channel="youtube"
                youtube={{ mute: 0, autoplay: 0 }}
                isOpen={isOpen}
                videoId="V7wcYSlJLTU"
                onClose={() => setIsOpen(false)}
              />
              <div
                onClick={openModal}
                onKeyDown={openModal}
                role="button"
                tabIndex={0}
                className="video-two__popup"
              >
                <FontAwesomeIcon icon={faPlay} className="playIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
