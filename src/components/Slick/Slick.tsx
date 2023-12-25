
import React, { Component } from "react";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default class Slick extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
         <div className="slickItem">
            <img src="/img/mobile/slide9.jpg" alt="" />
         </div>
         <div className="slickItem">
            <img src="/img/mobile/slide7.jpg" alt="" />
         </div>
         <div className="slickItem">
            <img src="/img/mobile/slide4.jpg" alt="" />
         </div>
        </Slider>
      </div>
    );
  }
}