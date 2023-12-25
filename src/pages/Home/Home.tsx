/* eslint-disable no-lone-blocks */
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Card from "../../components/Card/Card";
import TabsFilm from "../../components/Tabs/Tabs";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DanhSachBannerModel, DanhSachPhimModel, getDanhSacPhimApi, setDanhSachBannerApi } from "../../redux/reducer/QuanLyPhimReducer";
import { DispatchType, RootState } from "../../redux/configStore";
import { layThongTinHeThongRapApi } from "../../redux/reducer/QuanLyRapReducer";
import moment from "moment";
import { history } from "../../utils/lib/libs";
import { useParams, useLocation } from "react-router-dom";
import { setLoading } from "../../redux/reducer/LoadingReducer";


type Props = {};

const onChange = (key: string) => {
};



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

const Home = (props: Props |any) => {

  const {danhSachBanner,danhSachPhim}= useSelector((state:RootState)=> state.QuanLyPhimReducer )
  const [lichChieu, setLicChieu] = useState<boolean>(true);
  const arrRandom:any = [];

  for (let i = 0; i<4; i++) {
  let number=0; 
  let arrNumber:number[]=[];
  for(let i=0;i<4;i++){
    do{
      number=Math.floor(Math.random()* 20)
    }while (arrNumber.includes(number));
    arrNumber.push(number);
  }
    for(let j=0;j<arrNumber.length;j++){
        arrRandom.push(danhSachPhim[arrNumber[j]]);
    }
   }
const items: TabsProps["items"] = [
  {
    key: "1",
    label: "ĐIỆN ẢNH 24H",
    children: (
      <div className="dienAnh24h">
        <div className="card text-left cardDienAnh">
          <img
            className="card-img-top"
            src={arrRandom[0]?.hinhAnh}
            alt=""
          />
          <div className="card-body">
            <h4 className="card-title">{arrRandom[0]?.tenPhim} ra mắt vào ngày {moment(arrRandom[0]?.ngayKhoiChieu).format('DD/ MM/ YYYY')} là một trong những bộ phim được khán giả yêu thích nhất . </h4>
            <p className="card-text">{arrRandom[0]?.moTa.length >80 ? arrRandom[0]?.moTa.slice(0,170) + '...' : arrRandom[0]?.moTa}</p>
          </div>
        </div>
        <div className="card text-left cardDienAnh">
          <img
            className="card-img-top"
            src={arrRandom[1]?.hinhAnh}
            alt=""
          />
          <div className="card-body">
          <h4 className="card-title">Tin đồn rằng {arrRandom[1]?.tenPhim} ra mắt vào ngày {moment(arrRandom[1]?.ngayKhoiChieu).format('DD/ MM/ YYYY')} vướn phải nhiều tranh cải về dư luận về nội dung . </h4>
            <p className="card-text">{arrRandom[1]?.moTa.length >80 ? arrRandom[0]?.moTa.slice(0,170) + '...' : arrRandom[1]?.moTa}</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "2",
    label: "REVIEW",
    children: <div className="review">
    <div className="card text-left cardReview">
      <img
        className="card-img-top"
        src={arrRandom[2]?.hinhAnh}
        alt="123"
      />
      <div className="card-body">
      <h4 className="card-title">{arrRandom[2]?.tenPhim} là một bộ phim hay với nhiều tình tiết hấp dẫn người xem {moment(arrRandom[2]?.ngayKhoiChieu).format('DD/ MM/ YYYY')} sẽ chiếu chính thức ở rạp . </h4>
            <p className="card-text">{arrRandom[2]?.moTa.length >80 ? arrRandom[2]?.moTa.slice(0,170) + '...' : arrRandom[2]?.moTa}</p>
      </div>
    </div>
    <div className="card text-left cardReview">
      <img
        className="card-img-top"
        src={arrRandom[3]?.hinhAnh}
        alt=""
      />
      <div className="card-body">
      <h4 className="card-title">{arrRandom[3]?.tenPhim} là một bộ phim hay với nhiều tình tiết hấp dẫn người xem {moment(arrRandom[3]?.ngayKhoiChieu).format('DD/ MM/ YYYY')} sẽ chiếu chính thức ở rạp . </h4>
            <p className="card-text">{arrRandom[3]?.moTa.length >80 ? arrRandom[0]?.moTa.slice(0,170) + '...' : arrRandom[3]?.moTa}</p>
      </div>
    </div>
  </div>,
  },
];
  const renderFilms=()=>{
    return danhSachPhim?.map((item:DanhSachPhimModel, index:number)=>{
      return <div  key={index} >
        <Card item={item} />
      </div>
    })
  }

  const [number, setNumber]=useState<number>(3)

  const renderCardMobile=(number:number)=>{
    return danhSachPhim?.slice(0,number).map((item, index)=>{
      return  <div className="cardMobile text-left" key={index} onClick={()=>{
        history.push(`/detail/${item.maPhim}`)
      }}>
      <img
        src={item.hinhAnh}
        alt=""
      />
      <span>C18</span>
    </div>
    })
  }
console.log(lichChieu)
  const dispatch:DispatchType=useDispatch();
  useEffect(()=>{
    dispatch(setDanhSachBannerApi())
    dispatch(getDanhSacPhimApi(true))
    dispatch(layThongTinHeThongRapApi())
    dispatch(setLoading(true))
    setTimeout(()=>{
      dispatch(setLoading(false))
   },2000)
  },[])
  console.log(props)
  return (
    <div className="home">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          {danhSachBanner.map((item:DanhSachBannerModel, index:number)=>{
            return <div className={index===1? 'carousel-item active ' : 'carousel-item'} key={index} >
            <img
              src={item.hinhAnh}
              className="d-block w-100"
              alt="..."
            />
          </div>
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

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
            dispatch(getDanhSacPhimApi(true))
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
            dispatch(getDanhSacPhimApi(false))
          }}
        >
          Sắp chiếu
        </button>
      </div>
      <div className="body"  >
        <Slider {...settings} className="sliderSlick">
          {renderFilms()}
        </Slider>
        <div className="cardMobileRow " style={{ display: "none" }}>
          {renderCardMobile(number)}
          <button style={number!==3 ? {display:'none'} : {}} className="xemThem" onClick={():void=>{{
            setNumber(8)
          }}}>XEM THÊM </button>
           <button style={number!==3 ? {display:'block'} : {display:'none'}} className="xemThem" onClick={()=>{{
            setNumber(3)
          }}}>ẨN BỚT </button>
        </div>
        <TabsFilm  />

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
