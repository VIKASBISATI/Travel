import React from "react";
import { Carousel } from "antd";
function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((pic, index) => {
          return (
            <div key={index}>
              <img
                src={`http://localhost:5000/${pic}`}
                style={{ width: "100%", maxHeight: "150px" }}
                alt="product"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
