import React, { Fragment, useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Input, Modal, Radio, Space } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import {
  DanhSachVe,
  DatVeModel,
  datVeApi,
  getDanhSachPhongveApi,
  setDanhSachGheDangDat,
} from "../../redux/reducer/QuanLyVeReducer";
import _ from "lodash";
import { UserOutlined } from "@ant-design/icons";
import { layThongTinHeThongRapApi } from "../../redux/reducer/QuanLyRapReducer";
import { getUserInformation } from "../../redux/reducer/QuanLyNguoiDungReducer";
type Props = {};

const Checkout = (_props: Props) => {
  const [value, setValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState(420);
  const { danhSachPhongVe, danhSachGheDangDat, hinhAnhRap } = useSelector(
    (state: RootState) => state.QuanLyVeReducer
  );
  const { thongTinHeThongRap } = useSelector(
    (state: RootState) => state.QuanLyRapReducer
  );
    const { userLogin, userInfomation } = useSelector(
    (state: RootState) => state.QuanLyNguoiDungReducer
  );
  const { id } = useParams();
  const dispatch: DispatchType = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
    await setIsModalOpen(false);
    
 
   };
   const handleCancel = () => {
    setIsModalOpen(false);

  };


  const onChange = (e: RadioChangeEvent) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const renderGhe = () => {
    return danhSachPhongVe?.danhSachGhe.map((ghe, index) => {
      const classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      const classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      const classGheTuDat =
        ghe.taiKhoanNguoiDat === userLogin.taiKhoan ? "gheTuDat" : "";
      let classGheDangDat: string = "";
      const indexGheDangDat = danhSachGheDangDat.findIndex(
        (seat) => seat.maGhe === ghe.maGhe
      );
      if (indexGheDangDat !== -1) {
        classGheDangDat = "gheDangDat";
      }
      return (
        <Fragment key={index}>
          <button
            disabled={classGheDaDat !== "" ? true : false}
            className={`ghe ${classGheDaDat} ${classGheVip} ${classGheDangDat} ${classGheTuDat}`}
            onClick={() => {
              dispatch(setDanhSachGheDangDat(ghe));
            }}
          >
            {classGheTuDat !== "" ? (
              <UserOutlined
                style={
                  classGheVip !== ""
                    ? { color: "color: rgb(237, 231, 192)" }
                    : { color: "gray" }
                }
              />
            ) : (
              ghe.tenGhe
            )}
          </button>
          {parseInt(ghe.stt, 10) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  const formatTime = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    if(seconds===0){
    }
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  useEffect(() => {
    dispatch(getDanhSachPhongveApi(id));
    dispatch(layThongTinHeThongRapApi());
    dispatch(getUserInformation());
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      // clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <div className="checkout">
        <div className="content_left">
          <div className="name_time">
              <div className="info">
                <p>
                  {danhSachPhongVe?.thongTinPhim.tenRap}
                </p>
              </div>
              <div className="time">
                <p>Thời gian giữ vé {formatTime(timer)}</p>
              </div>
          </div>
          <div className="room">
            <div className="screen">
              <img src="/img/logo/screen.png" alt="" />
            </div>
            <div className="list_seats">{renderGhe()}</div>
            <div className="checkout_note">
              <div className="note_item">
                <button className="ghe"></button>
                <p>Ghế thường</p>
              </div>
              <div className="note_item">
                <button className="ghe gheDangDat"></button>
                <p>Ghế đang chọn</p>
              </div>
              <div className="note_item">
                <button className="ghe gheDaDat"></button>
                <p>Ghế đã được mua</p>
              </div>
              <div className="note_item">
                <button className="ghe gheVip"></button>
                <p>Ghế Vip</p>
              </div>
              <div className="note_item">
                <button className="ghe gheTuDat"></button>
                <p>Ghế bạn đã đặt</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content_right">
          <div className="money_total">
            {danhSachGheDangDat
              .reduce((total, ghe) => {
                return total + ghe.giaVe;
              }, 0)
              .toLocaleString()}
            VND
          </div>
          <div className="info_film">
            <h6>{danhSachPhongVe?.thongTinPhim.tenPhim}</h6>
            <p className="place">{danhSachPhongVe?.thongTinPhim.tenCumRap}</p>
            <p>
              {danhSachPhongVe?.thongTinPhim.ngayChieu} -{" "}
              {danhSachPhongVe?.thongTinPhim.diaChi}
            </p>
          </div>
          <div className="total_seats">
            <span>
              Ghế{" "}
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                return (
                  <Fragment key={index}>
                    {index > 0 ? "," : ""} {gheDD.stt}
                  </Fragment>
                );
              })}
            </span>
          </div>
          <div className="email">
            <span>E-mail</span>
            <p>{userLogin?.email}</p>
          </div>
          <div className="phone">
            <span>Phone</span>
            <p>{userInfomation?.soDT}</p>
          </div>
          <div className="hinh_thuc_thanh_toan">
            <span>Hình thức thanh toán</span>
            <br />
            <br />
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>
                  <img src="/img/logo/zalo.jpg" alt="" /> Thanh toán qua ZaloPay
                </Radio>
                <Radio value={2}>
                  <img src="/img/logo/visa.png" alt="" /> Visa, Master, JCB
                </Radio>
                <Radio value={3}>
                  <img src="/img/logo/atm.png" alt="" /> Thẻ ATM nội địa
                </Radio>
              </Space>
            </Radio.Group>
          </div>
          <button
            disabled={
              danhSachGheDangDat.length > 0 && value !== 0 ? false : true
            }
            className={
              value !== 0 && danhSachGheDangDat.length > 0
                ? "active_dat_ve"
                : ""
            }
            onClick={() => {
              const datVe: DatVeModel = {
                maLichChieu: parseInt(`${id}`),
                danhSachVe: _.map(danhSachGheDangDat, (item) =>
                  _.pick(item, ["maGhe", "giaVe"])
                ),
              };
              dispatch(datVeApi(datVe));
            }}
          >
            ĐẶT VÉ
          </button>
        </div>
        <div className="content_right_mobile" style={{display:'none'}}>
          <p>
              {" "}
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                return (
                  <Fragment key={index}>
                    {index > 0 ? "," : ""} {gheDD.stt}
                  </Fragment>
                );
              })}
            </p>
          <button className={danhSachGheDangDat.length>0 ? 'active_tiep_tuc' : ''} disabled={danhSachGheDangDat.length>0 ? false : true} onClick={()=>{
            setIsModalOpen(true)
          }}>Tiếp tục</button>
        </div>
        <Modal title={`Thanh toán`} width={700}  okText='' cancelText='' okType="primary" bodyStyle={{height:''}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="content_modal">
          <div className="money_total">
            {danhSachGheDangDat
              .reduce((total, ghe) => {
                return total + ghe.giaVe;
              }, 0)
              .toLocaleString()}
            VND
          </div>
          <div className="info_film">
            <h6>{danhSachPhongVe?.thongTinPhim.tenPhim}</h6>
            <p className="place">{danhSachPhongVe?.thongTinPhim.tenCumRap}</p>
            <p>
              {danhSachPhongVe?.thongTinPhim.ngayChieu} -{" "}
              {danhSachPhongVe?.thongTinPhim.diaChi}
            </p>
          </div>
          <div className="total_seats">
            <span>
              Ghế{" "}
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                return (
                  <Fragment key={index}>
                    {index > 0 ? "," : ""} {gheDD.stt}
                  </Fragment>
                );
              })}
            </span>
          </div>
          <div className="email">
            <span>E-mail</span>
            <p>lamthanhquihgs@gmail.com</p>
          </div>
          <div className="phone">
            <span>Phone</span>
            <p>0941003224</p>
          </div>
          <div className="hinh_thuc_thanh_toan">
            <span>Hình thức thanh toán</span>
            <br />
            <br />
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>
                  <img src="/img/logo/zalo.jpg" alt="" /> Thanh toán qua ZaloPay
                </Radio>
                <Radio value={2}>
                  <img src="/img/logo/visa.png" alt="" /> Visa, Master, JCB
                </Radio>
                <Radio value={3}>
                  <img src="/img/logo/atm.png" alt="" /> Thẻ ATM nội địa
                </Radio>
              </Space>
            </Radio.Group>
          </div>
          <button
            disabled={
              danhSachGheDangDat.length > 0 && value !== 0 ? false : true
            }
            className={
              value !== 0 && danhSachGheDangDat.length > 0
                ? "active_dat_ve"
                : ""
            }
            onClick={() => {
              const datVe: DatVeModel = {
                maLichChieu: parseInt(`${id}`),
                danhSachVe: _.map(danhSachGheDangDat, (item) =>
                  _.pick(item, ["maGhe", "giaVe"])
                ),
              };
              dispatch(datVeApi(datVe));
              setIsModalOpen(false)
            }}
          >
            ĐẶT VÉ
          </button>
        </div>
      </Modal>
      </div>
    </>
  );
};

export default Checkout;
