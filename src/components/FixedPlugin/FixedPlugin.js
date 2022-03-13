/*eslint-disable*/
import React, { useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";
import imagine1 from "assets/img/body-builder-1.jpg";
import imagine2 from "assets/img/body-builder-2.jpg";
import imagine3 from "assets/img/body-builder-3.jpg";
import imagine4 from "assets/img/body-builder-4.jpg";

const imagesContainer = [
  { id: 1, currentSlide: imagine1 },
  { id: 2, currentSlide: imagine2 },
  { id: 3, currentSlide: imagine3 },
  { id: 4, currentSlide: imagine4 },
]

export default function FixedPlugin(props) {
  // const [classes, setClasses] = React.useState("dropdown show");
  // const [bg_checked, setBg_checked] = React.useState(false);
  const [bgImage, setBgImage] = React.useState(props.bgImage);
  const handleClick = () => {
    props.handleFixedClick();
  };

  // const handleAutoChange = () => {
  //   for (let imageIndex = 0; imageIndex < imagesContainer.length; imageIndex++) {
  //     const intervel = setInterval(() => {
  //       setBgImage(imagesContainer[imageIndex].currentSlide);
  //       props.handleImageClick(imagesContainer[imageIndex].currentSlide);
  //       if (imageIndex === imagesContainer.length) {
  //         clearInterval(intervel);
  //       }
  //     }, 3000);
  //   }
  // }

  useEffect(() => {
    // handleAutoChange()
  }, [bgImage])
  return (
    <div
      className={classnames("fixed-plugin")}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={handleClick}>
          <i className="fa fa-cog fa-2x" />
        </div>
        <ul className="dropdown-menu">
          <li className="header-title">SIDEBAR FILTERS</li>
          <li className="adjustments-line">
            <a className="switch-trigger">
              <div>
                <span
                  className={
                    props.bgColor === "blue"
                      ? "badge filter badge-blue active"
                      : "badge filter badge-blue"
                  }
                  data-color="blue"
                  onClick={() => {
                    props.handleColorClick("blue");
                  }}
                />
                <span
                  className={
                    props.bgColor === "green"
                      ? "badge filter badge-green active"
                      : "badge filter badge-green"
                  }
                  data-color="green"
                  onClick={() => {
                    props.handleColorClick("green");
                  }}
                />
                <span
                  className={
                    props.bgColor === "red"
                      ? "badge filter badge-red active"
                      : "badge filter badge-red"
                  }
                  data-color="red"
                  onClick={() => {
                    props.handleColorClick("red");
                  }}
                />
                <span
                  className={
                    props.bgColor === "orange"
                      ? "badge filter badge-orange active"
                      : "badge filter badge-orange"
                  }
                  data-color="orange"
                  onClick={() => {
                    props.handleColorClick("orange");
                  }}
                />
              </div>
            </a>
          </li>
          <li className="header-title">Images</li>
          {imagesContainer.map((img => (
            <li key={img.id} className={bgImage === img.currentSlide ? "active" : ""}>
              <a
                className="img-holder switch-trigger"
              //onClick={() => handleAutoChange(img)}
              >
                <img src={img.currentSlide} alt="..." />
              </a>
            </li>
          )))}
          <li className="adjustments-line" />
        </ul>
      </div>
    </div>
  );
}

FixedPlugin.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func,
};
