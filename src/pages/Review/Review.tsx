import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import {
  getDanhSacPhimApi,
  getPhimDetailApi,
} from "../../redux/reducer/QuanLyPhimReducer";
import { useParams } from "react-router-dom";
import moment from "moment";
type Props = {};

const Review = (props: Props) => {
  const { phimDetail, danhSachPhim } = useSelector(
    (state: RootState) => state.QuanLyPhimReducer
  );
  const dispatch: DispatchType = useDispatch();
  const { id } = useParams();
  const arrRandom: any = [];
  for (let i = 0; i < 4; i++) {
    let number = 0;
    let arrNumber: number[] = [];
    for (let i = 0; i < 4; i++) {
      do {
        number = Math.floor(Math.random() * 20);
      } while (arrNumber.includes(number));
      arrNumber.push(number);
    }
    for (let j = 0; j < arrNumber.length; j++) {
      arrRandom.push(danhSachPhim[arrNumber[j]]);
    }
  }
  useEffect(() => {
    dispatch(getPhimDetailApi(id));
    dispatch(getDanhSacPhimApi(true));
  }, []);
  console.log(phimDetail);
  return (
    <div className="review_page">
      <div className="review_page_left">
        <p className="date">
          {moment(phimDetail?.ngayKhoiChieu).format("DD/MM/YY")},{" "}
          {moment(phimDetail?.ngayKhoiChieu).format("hh:mm")}
        </p>
        <h2>{phimDetail?.tenPhim}</h2>
        <p className="title">{phimDetail?.moTa}</p>
        <span>* Bài tiết lộ một phần nội dung phim </span>
        <br />
        <br />
        <iframe
          src={phimDetail?.trailer}
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ width: "100%", height: "400px" }}
        ></iframe>
        <br />
        <span className="title_trailer">
          Trailer "{phimDetail?.tenPhim}"" ra rạp từ ngày{" "}
          {moment(phimDetail?.ngayKhoiChieu).format("DD/MM/YYYY")}{" "}
        </span>
        <p className="desc1">
          {phimDetail?.moTa}
          {phimDetail?.moTa}
        </p>
        <img src={phimDetail?.hinhAnh} alt="" />
        <p className="desc2">
          {phimDetail?.moTa}
          {phimDetail?.moTa}
        </p>
      </div>
      <div className="review_page_right">
        <div className="video_review">
          <iframe
            src={arrRandom[0]?.trailer}
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ width: "100%", height: "150px" }}
          ></iframe>
          <p>{arrRandom[0]?.tenPhim}</p>
        </div>
        <div className="img_review">
          <img src={arrRandom[0]?.hinhAnh} alt="" />
          <p>{arrRandom[0]?.moTa.slice(0, 100)}</p>
        </div>
        <br />

        <div className="video_review">
          <iframe
            src={arrRandom[1]?.trailer}
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ width: "100%", height: "150px" }}
          ></iframe>
          <p>{arrRandom[1]?.tenPhim}</p>
        </div>
        <div className="img_review">
          <img src={arrRandom[1]?.hinhAnh} alt="" />
          <p>{arrRandom[1]?.moTa.slice(0, 100)}</p>
        </div>
        <br />

        <div className="video_review">
          <iframe
            src={arrRandom[2]?.trailer}
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ width: "100%", height: "150px" }}
          ></iframe>
          <p>{arrRandom[2]?.tenPhim}</p>
        </div>
        <div className="img_review">
          <img src={arrRandom[2]?.hinhAnh} alt="" />
          <p>{arrRandom[2]?.moTa.slice(0, 100)}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
