/* eslint-disable no-lone-blocks */
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Card from "../../components/Card/Card";
import TabsFilm from "../../components/Tabs/Tabs";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DanhSachBannerModel,
  DanhSachPhimModel,
  PhimDetailModel,
  getDanhSacPhimApi,
  getPhimDetailApi,
  setDanhSachBannerApi,
} from "../../redux/reducer/QuanLyPhimReducer";
import { DispatchType, RootState } from "../../redux/configStore";
import { layThongTinHeThongRapApi } from "../../redux/reducer/QuanLyRapReducer";
import moment from "moment";
import { history } from "../../utils/lib/libs";
import { useParams, useLocation } from "react-router-dom";
import { setLoading } from "../../redux/reducer/LoadingReducer";
import Modal from "antd/lib/modal/Modal";
import { Carousel } from "react-bootstrap";

type Props = {};

const onChange = (key: string) => {};

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  slidesRow: 2,
  rows: 2,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const Home = (props: Props | any) => {
  const { danhSachDetailBanner, danhSachBanner, danhSachPhim, phimDetail } =
    useSelector((state: RootState) => state.QuanLyPhimReducer);
  const [lichChieu, setLicChieu] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState<string | undefined>("");
  const [display, setDisplay] = useState<string>("block");
  const [tenPhim, setTenPhim]= useState<string>('');
  let iframeRef: any = useRef(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
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
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "ĐIỆN ẢNH 24H",
      children: (
        <div className="dienAnh24h">
          <div
            className="card text-left cardDienAnh"
            onClick={() => {
              history.push(`/news/${arrRandom[0]?.maPhim}`);
            }}
          >
            <img className="card-img-top" src={arrRandom[0]?.hinhAnh} alt="" />
            <div className="card-body">
              <h4 className="card-title">
                {arrRandom[0]?.tenPhim} ra mắt vào ngày{" "}
                {moment(arrRandom[0]?.ngayKhoiChieu).format("DD/ MM/ YYYY")} là
                một trong những bộ phim được khán giả yêu thích nhất .{" "}
              </h4>
              <p className="card-text">
                {arrRandom[0]?.moTa.length > 80
                  ? arrRandom[0]?.moTa.slice(0, 170) + "..."
                  : arrRandom[0]?.moTa}
              </p>
            </div>
          </div>
          <div
            className="card text-left cardDienAnh"
            onClick={() => {
              history.push(`/news/${arrRandom[1]?.maPhim}`);
            }}
          >
            <img className="card-img-top" src={arrRandom[1]?.hinhAnh} alt="" />
            <div className="card-body">
              <h4 className="card-title">
                Tin đồn rằng {arrRandom[1]?.tenPhim} ra mắt vào ngày{" "}
                {moment(arrRandom[1]?.ngayKhoiChieu).format("DD/ MM/ YYYY")}{" "}
                vướn phải nhiều tranh cải về dư luận về nội dung .{" "}
              </h4>
              <p className="card-text">
                {arrRandom[1]?.moTa.length > 80
                  ? arrRandom[0]?.moTa.slice(0, 170) + "..."
                  : arrRandom[1]?.moTa}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "REVIEW",
      children: (
        <div className="review">
          <div
            className="card text-left cardReview"
            onClick={() => {
              history.push(`/review/${arrRandom[2].maPhim}`);
            }}
          >
            <img
              className="card-img-top"
              src={arrRandom[2]?.hinhAnh}
              alt="123"
            />
            <div className="card-body">
              <h4 className="card-title">
                {arrRandom[2]?.tenPhim} là một bộ phim hay với nhiều tình tiết
                hấp dẫn người xem{" "}
                {moment(arrRandom[2]?.ngayKhoiChieu).format("DD/ MM/ YYYY")} sẽ
                chiếu chính thức ở rạp .{" "}
              </h4>
              <p className="card-text">
                {arrRandom[2]?.moTa.length > 80
                  ? arrRandom[2]?.moTa.slice(0, 170) + "..."
                  : arrRandom[2]?.moTa}
              </p>
            </div>
          </div>
          <div
            className="card text-left cardReview"
            onClick={() => {
              history.push(`/review/${arrRandom[3].maPhim}`);
            }}
          >
            <img className="card-img-top" src={arrRandom[3]?.hinhAnh} alt="" />
            <div className="card-body">
              <h4 className="card-title">
                {arrRandom[3]?.tenPhim} là một bộ phim hay với nhiều tình tiết
                hấp dẫn người xem{" "}
                {moment(arrRandom[3]?.ngayKhoiChieu).format("DD/ MM/ YYYY")} sẽ
                chiếu chính thức ở rạp .{" "}
              </h4>
              <p className="card-text">
                {arrRandom[3]?.moTa.length > 80
                  ? arrRandom[0]?.moTa.slice(0, 170) + "..."
                  : arrRandom[3]?.moTa}
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const renderFilms = () => {
    return danhSachPhim?.map((item: DanhSachPhimModel, index: number) => {
      return (
        <div key={index}>
          <Card item={item} />
        </div>
      );
    });
  };
  const [number, setNumber] = useState<number>(3);

  const renderCardMobile = (number: number) => {
    return danhSachPhim?.slice(0, number).map((item, index) => {
      return (
        <div
          className="cardMobile text-left"
          key={index}
          onClick={() => {
            history.push(`/detail/${item.maPhim}`);
          }}
        >
          <img src={item.hinhAnh} alt="" />
          <span>C18</span>
        </div>
      );
    });
  };
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    dispatch(setDanhSachBannerApi());
    dispatch(getDanhSacPhimApi(true));
    dispatch(layThongTinHeThongRapApi());
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    iframeRef.current.src += "?autoplay=0";
    setUrl("");
  };
  return (
    <div className="home">
      <Modal
        title={`Trailer ${tenPhim}`}
        footer=""
        width={700}
        bodyStyle={{ height: "400px" }}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <iframe
          ref={iframeRef}
          src={url}
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      </Modal>
      <Carousel>
      <Carousel.Item interval={1000}>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img src={danhSachBanner[0]?.hinhAnh} className="d-block w-100" alt="..."  onClick={()=>{
                  history.push(`/detail/${11451}`)
                }} />
                <img
                  className="play"
                  src="/img/logo/play-video.png"
                  alt=""
                  onClick={() => {
                    showModal();
                    setTenPhim(danhSachBanner[0]?.tenPhim)
                    setUrl(danhSachBanner[0]?.trailer);
                  }}
                />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
         <img src={danhSachBanner[1]?.hinhAnh} className="d-block w-100" alt="..."  onClick={()=>{
                  history.push(`/detail/${11448}`)
                }} />
                <img
                  className="play"
                  src="/img/logo/play-video.png"
                  alt=""
                  onClick={() => {
                    showModal();
                    setTenPhim(danhSachBanner[1]?.tenPhim)
                    setUrl(danhSachBanner[1]?.trailer);
                  }}
                />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={danhSachBanner[2]?.hinhAnh} className="d-block w-100" alt="..."  onClick={()=>{
                  history.push(`/detail/${11477}`)
                }} />
                <img
                  className="play"
                  src="/img/logo/play-video.png"
                  alt=""
                  onClick={() => {
                    showModal();
                    setTenPhim(danhSachBanner[2]?.tenPhim)
                    setUrl(danhSachBanner[2]?.trailer);
                  }}
                />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>


      <div className="dangChieuSapChieu" id="lichChieu">
        <button
          className="dangChieu"
          style={
            lichChieu
              ? { background: "#000", color: "#fff" }
              : { background: "#fff" }
          }
          onClick={() => {
            setLicChieu(true);
            dispatch(getDanhSacPhimApi(true));
          }}
        >
          Đang chiếu
        </button>
        <button
          className="sapChieu"
          style={
            !lichChieu
              ? { background: "#000", color: "#fff" }
              : { background: "#fff" }
          }
          onClick={() => {
            setLicChieu(false);
            dispatch(getDanhSacPhimApi(false));
          }}
        >
          Sắp chiếu
        </button>
      </div>
      <div className="body">
        <Slider {...settings} className="sliderSlick">
          {renderFilms()}
        </Slider>
        <div className="cardMobileRow " style={{ display: "none" }}>
          {renderCardMobile(number)}
          <button
            style={number === danhSachPhim.length ? { display: "none" } : {}}
            className="xemThem"
            onClick={(): void => {
              {
                setNumber(
                  number >= danhSachPhim.length - 1
                    ? danhSachPhim.length
                    : number + 3
                );
              }
            }}
          >
            XEM THÊM{" "}
          </button>
          <button
            style={number <= 3 ? { display: "none" } : { display: "block" }}
            className="xemThem"
            onClick={() => {
              {
                setNumber(number <= 4 ? 3 : number - 3);
              }
            }}
          >
            ẨN BỚT{" "}
          </button>
        </div>
        <TabsFilm />

        <div className="tinTuc" id="tinTuc">
          <Tabs
            className="tabsFilms"
            tabPosition="top"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
          ;
        </div>
      </div>
    </div>
  );
};

export default Home;
