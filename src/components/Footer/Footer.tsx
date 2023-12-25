import React from "react";
import { NavLink } from "react-router-dom";
import Slick from "../Slick/Slick";
type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="footer" id="ungDung">
      <div className="footerTop">
        <div className="footerTopLeft">
          <h4>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h4>
          <p>
            Khổng chỉ đặt vé , bạn còn có thể bình luận , chấm điểm rạp và đổi
            quà hấp dẫn.
          </p>
          <button>Cài đặt Progressive App!</button>
          <p>
            Tix có hai phiên bản <u>IOS</u> và <u>Android</u>
          </p>
        </div>
        <div className="footerTopRight">
          <div className="mobileApp">
            <img src="/img/mobile/mobile.png" alt="" />
          </div>
          <div className="slick">
            <Slick />
          </div>
        </div>
      </div>
      <div className="footerBottom">
          <div className="footerBottomItem col_1">
            <h4>Tix</h4>
            <p>FAQ</p>
            <p>Brand</p>
            <p>Guideliness</p>
          </div>
          <div className="footerBottomItem col_2">
            <p>Thỏa thuận sử dụng</p>
            <p>Chính sách bảo mật </p>
          </div>
          <div className="footerBottomItem col_3">
            <h4>Đối tác</h4>
            <div className="doiTac">
              <img src="/img/logo/cgv.png" alt="" />
              <img src="/img/logo/bhd.png" alt="" />
              <img src="/img/logo/galaxycine.png" alt="" />
              <img src="/img/logo/cinestar.png" alt="" />
              <img src="/img/logo/lotte.png" alt="" />
            </div>
          </div>
          <div className="footerBottomItem col_4">
            <h4>MOBILE APP</h4>
            <div className="mobileAppBottom">
              <img src="/img/logo/apple-logo.png" alt="" />
              <img src="/img/logo/android-logo.png" alt="" />
            </div>
          </div>
          <div className="footerBottomItem col_5">
            <h4>SOCIAL APP</h4>
            <div className="socialApp">
              <img src="/img/logo/facebook-logo.png" alt="" />
              <img src="/img/logo/zalo-logo.png" alt="" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Footer;
