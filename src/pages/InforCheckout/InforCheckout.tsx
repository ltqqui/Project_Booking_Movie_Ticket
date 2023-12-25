import React, { Fragment, useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Input, Modal, Radio, Space } from "antd";
import { DispatchType, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { DanhSachGhe, getUserInformation } from "../../redux/reducer/QuanLyNguoiDungReducer";
import moment from "moment";
import _ from "lodash";
type Props = {};
type InfoModal = {
  tenPhim:string | undefined;
  hinhAnh: string | undefined;
  diaDiem: string | undefined;
  ngayGioDat: Date;
  tenRap: string | undefined;
  maHTR:string |undefined;
  maVe: number;
  giaVe: number;
  danhSachGhe:DanhSachGhe[];
};

const InforCheckout = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { userInfomation } = useSelector(
    (state: RootState) => state.QuanLyNguoiDungReducer
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [info, setInfo] = useState<InfoModal | null>(null);
  const renderThongTinVe = () => {
    return userInfomation?.thongTinDatVe.map((item, index) => {
      const seats = _.first(item.danhSachGhe);
      console.log(typeof seats?.tenHeThongRap);
      return (
        <div className="card_info" key={index}>
          <div className="card_left">
            <img src={item.hinhAnh} alt="" />
          </div>
          <div className="card_right">
            <h6>{item.tenPhim}</h6>
            <p className="dia_diem">Địa điểm: {seats?.tenHeThongRap}</p>
            <p className="ngay_dat">
              Ngày đặt: {moment(item.ngayDat).format("DD/MM/YYYY")}
            </p>
            <p className="ten_rap">Tên rạp: {seats?.tenRap}</p>
            <span>
              {" "}
              Ghế
              {item.danhSachGhe.slice(0, 9).map((ghe, key) => {
                return (
                  <Fragment key={key}>
                    {key > 0 ? "," : ""} {ghe.tenGhe}
                  </Fragment>
                );
              })}
            </span>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setInfo({
                tenPhim:item.tenPhim,
                hinhAnh:item.hinhAnh,
                diaDiem: seats?.tenHeThongRap,
                ngayGioDat: item.ngayDat,
                tenRap: seats?.tenRap,
                maHTR:seats?.maHeThongRap,
                maVe: item.maVe,
                giaVe: item.giaVe,
                danhSachGhe:item.danhSachGhe
              });
            }}
          >
            Chi tiết {">>"}
          </button>
        </div>
      );
    });
  };

  const renderModal = (detailModal: InfoModal) => {
    return <Fragment></Fragment>;
  };

  useEffect(() => {
    dispatch(getUserInformation());
  }, []);
  return (
    <div className="thong_tin_dat_ve">
      <div className="content_top">
        <h2>Thông tin đặt vé của bạn</h2>
        <p>Hãy xem lại thông tin đặt vé của bạn nhé !</p>
      </div>
      <div className="content_bottom">
        <div className="content_main">{renderThongTinVe()}</div>
      </div>
      <Modal
        title={`Thông tin chi tiết`}
        width={700}
        okText=""
        cancelText=""
        okType="primary"
        bodyStyle={{ height: "" }}
        open={isModalOpen}
        onOk={() => {setIsModalOpen(false)}}
        onCancel={() => {setIsModalOpen(false)}}
      >
        <div className="main_modal">
          <div className="modal_left">
            <img src={info?.hinhAnh} width={100} alt="" />
          </div>
          <div className="modal_right">
            <h5 >{info?.tenPhim}</h5>
            <p className="dia_diem">Địa điểm: <span className={
                        info?.maHTR === "BHDStar"
                          ? "BHDStar"
                          : info?.maHTR === "CGV"
                          ? "CGV"
                          : info?.maHTR === "Galaxy"
                          ? "Galaxy"
                          : info?.maHTR === "LotteCinima"
                          ? "LotteCinima"
                          : info?.maHTR === "CineStar"
                          ? "CineStar"
                          : "MegaGS"
                      }>{info?.diaDiem}</span> </p>
            <p className="ngay_dat">Ngày đặt: {moment(info?.ngayGioDat).format("DD/MM/YYYY")}</p>
            <p className="gio_dat">Giờ đặt: {moment(info?.ngayGioDat).format("hh:mm A")}</p>
            <p className="ten_rap">Tên rạp: {info?.tenRap}</p>
            <p className="ma_ve">Mã vé: {info?.maVe}</p>
            <p className="gia_ve">Giá vé: <span>{info?.giaVe} VND </span></p>
            <p className="ds_Ghe">Ghế: <span>{info?.danhSachGhe.slice(0, 9).map((ghe, key) => {
                return (
                  <Fragment key={key}>
                    {key > 0 ? "," : ""} {ghe.tenGhe}
                  </Fragment>
                );
              })}
              </span>
               </p>
            <p className="money_total">Tổng tiền: <span>{info !==null ? info?.danhSachGhe.length * info?.giaVe : ''} VND</span> </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InforCheckout;
