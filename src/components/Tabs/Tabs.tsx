import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configStore";
import { DanhSachPhimModel } from "../../redux/reducer/QuanLyPhimReducer";
import { LayThongTinHeThongRapModel, LstLichChieuTheoPhim } from "../../redux/reducer/QuanLyRapReducer";
import _, { drop } from 'lodash'
import moment from "moment";
import { NavLink } from "react-router-dom";
import { history } from "../../utils/lib/libs";

const onChange = (key: string) => {};

const TabsFilm: React.FC = (props) => {
  const [witdthScreen, setWidthScreen]= useState<number>(window.innerWidth);
  const[openMenuFilm, setOpenMenuFilm]= useState<boolean>(false)
  const [dropDownMenu , setDropDownMenu ]=useState<string>('')
  useEffect(()=>{
    window.onresize=()=>{
      setWidthScreen(window.innerWidth);
    }
  },[])
  const renderLichChieu=(arr:LstLichChieuTheoPhim[], maPhim:number)=>{
    return arr?.slice(0,5).map((item,index)=>{
      return <div className="gioChieu" key={index}>
          <div onClick={()=>{
            history.push(`/detail/${maPhim}`)
          }}> {moment(item.ngayChieuGioChieu).format('hh mm :A')}</div>
      </div>
    })
  }
  const { thongTinHeThongRap } = useSelector(
    (state: RootState) => state.QuanLyRapReducer
  );


  const items: TabsProps["items"] = thongTinHeThongRap.map((rap, index) => {
    return {
      key: rap.maHeThongRap,
      label: <img src={rap.logo} alt="" width={50} />,
      children: (
        <Tabs
          className="rap"
          tabPosition="left"
          defaultActiveKey="1"
          items={rap.lstCumRap.map((cumRap, index) => {
            return {
              key: `${index}`,
              label: (
                <div>
                  <div className="cumRap" style={{marginBottom:"5px"}}  >
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
                    <p>
                      {cumRap.diaChi.length > 45
                        ? cumRap.diaChi.slice(0, 45) + "..."
                        : cumRap.diaChi}
                    </p>
                  </div>  
                  <hr />
                </div>
                <div>
                </div>
                 {cumRap.danhSachPhim?.slice(0,5).map((phim, index)=>{
                  return <div className={`phimMobile`} key={index}  style={openMenuFilm && dropDownMenu===cumRap.maCumRap ? {display:'block', transform:'scaleY(100%)', transition:'all 0.3s'} : {display:'none', transform:'scaleY(0%)', transition:'all 0.3s'}} >
                  <div className="filmItemMobile">
                    <img src={phim.hinhAnh} alt="" width={50} />
                    <div className="infoFilmMobile">
                      <h5>{phim.tenPhim}</h5>
                      <p>120 phút - Điểm tix 10</p>
                    </div>
                  </div>
                 <div className="lichNgayChieu">
                  <p>Ngày {moment(Date.now()).format("DD")}, tháng {moment(Date.now()).format("MM")} ,năm {moment(Date.now()).format("YYYY")}</p>
                 <div className="lichChieu">
                    {renderLichChieu(phim.lstLichChieuTheoPhim, phim.maPhim)}
                  </div>
                 </div>
                </div>
                 })} 
                <i className="fa-solid fa-chevron-down" style={openMenuFilm && cumRap.maCumRap===dropDownMenu ? {transform:"rotate(180deg)", transition:'all 0.5s'}: {transform:"rotate(0deg)", transition:'all 0.5s'}} onClick={()=>{
                  setOpenMenuFilm(dropDownMenu===cumRap.maCumRap ? !openMenuFilm : true)
                  setDropDownMenu(cumRap.maCumRap)
                }} ></i>
                <div className="line" style={{width:'100%', height:'0.1px', background:'#dfdfdf'}}></div>
                </div>
              ),
              children: (
                <Tabs
                  className="tabInfoFilms"
                  tabPosition="left" 
                  defaultActiveKey="3"
                  items={cumRap.danhSachPhim.map((phim, index) => {
                    return {
                      key: `${index}`,
                      label: (
                        <div className="phim">
                          <div className="filmItem">
                            <img src={phim.hinhAnh} alt="" width={50} />
                            <div className="infoFilm">
                              <h5>{phim.tenPhim}</h5>
                              <p>120 phút - Điểm tix 10</p>
                            </div>
                          </div>
                         <div className="lichNgayChieu">
                          <p>Ngày {moment(Date.now()).format("DD")}, tháng {moment(Date.now()).format("MM")} ,năm {moment(Date.now()).format("YYYY")}</p>
                         <div className="lichChieu">
                            {renderLichChieu(phim.lstLichChieuTheoPhim,phim.maPhim)}
                          </div>
                         </div>
                            <hr />
                        </div>
                      )
                    };
                  })}
                  onChange={onChange}
                />
              ),
            };
          })}
          onChange={onChange}
        />
      ),
    };
  });
  return (
    <Tabs
      className="tabsFilms" id="cumRap"
      tabPosition={witdthScreen <600 ? 'top' : 'left' }
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  );
};

export default TabsFilm;
