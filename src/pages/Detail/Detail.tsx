import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { DispatchType, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { getPhimDetailApi } from "../../redux/reducer/QuanLyPhimReducer";
import moment from "moment";
import { Rate, Tabs } from "antd";
import type { TabsProps } from "antd";
type Props = {};

const Detail = (props: Props |any) => {
  const { id } = useParams<string>();
  const {userLogin}= useSelector((state:RootState)=> state.QuanLyNguoiDungReducer);
  const [bottomDetail, setBottomDetail] = useState<string>("lich_chieu");
  const [widthScreen, setWidthScreen] = useState<number>(window.innerWidth);
  const [trailerMobile, setTrailerMobile]= useState<boolean>(false);
  const [url, setUrl]=useState<string|undefined>('');
  let iframeRef:any=useRef(null);
  useEffect(() => {
    window.onresize = () => {
      setWidthScreen(window.innerWidth);
    };
  }, []);
  const { phimDetail } = useSelector(
    (state: RootState) => state.QuanLyPhimReducer
  );
    
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    dispatch(getPhimDetailApi(id));
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <h4
          onClick={() => {
            setBottomDetail("lich_chieu");
          }}
        >
          Lịch chiếu
        </h4>
      ),
      children: (
        <Tabs
          className="lich"
          defaultActiveKey="2"
          tabPosition={widthScreen < 600 ? "top" : "left"}
          items={phimDetail?.heThongRapChieu.map((rap, index) => {
            return {
              key: rap.tenHeThongRap,
              label: <img src={rap.logo} width={50} alt="" />,
              children: (
                <Tabs
                  className="tab_item_lich_chieu"
                  defaultActiveKey="3"
                  tabPosition="left"
                  items={rap.cumRapChieu.map((cumRap, index) => {
                    return {
                      key: cumRap.tenCumRap,
                      label: (
                        <div>
                          <div
                            className="cumRap"
                            style={{ marginBottom: "5px" }}
                          >
                            <img src={cumRap.hinhAnh} alt="" width={50} />
                            <div className="infoCumRap">
                              <h5
                                className={
                                  rap.maHeThongRap === "BHDStar"
                                    ? "BHDStar"
                                    : rap.maHeThongRap === "CGV"
                                    ? "CGV"
                                    : rap.maHeThongRap === "Galaxy"
                                    ? "Galaxy"
                                    : rap.maHeThongRap === "LotteCinima"
                                    ? "LotteCinima"
                                    : rap.maHeThongRap === "CineStar"
                                    ? "CineStar"
                                    : "MegaGS"
                                }
                              >
                                {cumRap.tenCumRap}
                              </h5>
                              <p>{cumRap.diaChi}</p>
                            <div className="gio_chieu">
                            {cumRap.lichChieuPhim.slice(0,1).map((gio,index)=>{
                              return  <NavLink  key={index} to={`/checkout/${gio.maLichChieu}`}>
                              {moment(
                                gio.ngayChieuGioChieu
                              ).format("hh:mm A")}
                            </NavLink>
                             })}
                            </div>
                            </div>
                          </div>
                          <div></div>
                          <div
                            className="line"
                            style={{
                              width: "100%",
                              height: "0.1px",
                              background: "#dfdfdf",
                            }}
                          ></div>
                        </div>
                      ),
                    };
                  })}
                />
              ),
            };
          })}
        />
      ),
    },
    {
      key: "2",
      label: (
        <h4
          onClick={() => {
            setBottomDetail("thong_tin");
          }}
        >
          Thông tin
        </h4>
      ),
      children: (
        <div className="tab_item_thong_tin">
          <div className="thong_tin_left">
            <p style={{ fontWeight: "600" }}>
              Tên phim :{" "}
              <span style={{ fontWeight: "300" }} className="name_phim">
                {phimDetail?.tenPhim}
              </span>
            </p>
            <p style={{ fontWeight: "600" }}>
              Ngày chiếu{" "}
              <span style={{ fontWeight: "300" }} className="ngay_chieu">
                {moment(phimDetail?.ngayKhoiChieu).format("DD/MM/YYYY")}
              </span>
            </p>
          </div>
          <div className="thong_tin_right">
            <p style={{ fontWeight: "600" }}>Nội dung</p>
            <p>{phimDetail?.moTa}</p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="detail">
        <div
          className="glassmorphism"
          style={{
            backgroundImage: `url('${phimDetail?.hinhAnh}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "680px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="glass_mobile" style={{display:'none'}}>
            <img onClick={()=>{setTrailerMobile(!trailerMobile)}} style={trailerMobile ? {display:'none'} :{display:'block'}} src="/img/logo/play-video.png" alt="" />
            <iframe style={trailerMobile ? {display:'block'}: {display:'none'}} width="438" height="246"  ref={iframeRef} src={phimDetail?.trailer}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            <div className="info_phim_mobile">
              <p>{moment(phimDetail?.ngayKhoiChieu).format("DD.MM.YYYY")}</p>
              <h5><span>C18</span>{phimDetail?.tenPhim}</h5>
              <p>120 phút - 10 Tix - 2D/Digital</p>
            </div>
          </div>
          <div className="glass_top">
            <div className="detail_top">
              <div className="detail_top_left">
                <div className="info_detail_left">
                  <img src={phimDetail?.hinhAnh} alt="" />
                </div>
                <div className="info_detail_right">
                  <p>
                    {moment(phimDetail?.ngayKhoiChieu).format("DD.MM.YYYY")}
                  </p>
                  <span>C18</span>
                  <h5>{phimDetail?.tenPhim}</h5>
                  <p>120 phút - 10 Tix - 2D/Digital</p>
                  <a href="#muaVe">Mua vé</a>
                </div>
              </div>
              <div className="detail_top_right">
                <div
                  className={`c100 p${
                    (phimDetail?.danhGia as number) * 10
                  } big`}
                >
                  <span>
                    {phimDetail?.danhGia
                      ? (phimDetail?.danhGia as number) * 10
                      : 0}
                  </span>
                  <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                  </div>
                </div>
                <div className="rating">
                  <Rate allowHalf value={(phimDetail?.danhGia as number) / 2} />
                </div>
              </div>
            </div>
          </div>
          <div className="detail_bottom" id="muaVe">
            <Tabs
              className={`tab_Detail_${bottomDetail}`}
              tabPosition="top"
              defaultActiveKey="1"
              items={items}
            ></Tabs>
          </div>
        </div>
        <div className="tab_Detail_lich_chieu_mobile" style={{display:'none'}}>
        <Tabs 
              className={`tab_Detail_mobile_${bottomDetail}`}
              tabPosition="top"
              defaultActiveKey="1"
              items={items}
            ></Tabs>
        </div>
      </div>
    </>
  );
};

export default Detail;
