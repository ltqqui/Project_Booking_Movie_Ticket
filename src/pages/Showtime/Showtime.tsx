import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EditPhimModel,
  PhimDetailModel,
  addFilmAip,
  getDanhSacPhimManageApi,
  getFilmEditApi,
  getPhimDetailApi,
  updateFilmApi,
} from "../../redux/reducer/QuanLyPhimReducer";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { history } from "../../utils/lib/libs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { Switch, DatePicker, Space, Select, InputNumber, Table } from "antd";
import parse from "html-react-parser";
import type { DatePickerProps } from "antd";
import moment from "moment";
import { GROUP } from "../../utils/settings/config";
import {
  layThongTinCunRapTheoHeThongApi,
  layThongTinHeThongRapShowtimeApi,
} from "../../redux/reducer/QuanLyRapReducer";
import { taoLichChieuApi } from "../../redux/reducer/QuanLyVeReducer";
import _ from "lodash";
import { ColumnsType } from "antd/lib/table";
const dateFormat = "DD/MM/YYYY";
type Props = {};
const giaVe = [
  { label: 75000, value: 75000 },
  { label: 100000, value: 100000 },
  { label: 120000, value: 120000 },
  { label: 150000, value: 150000 },
];

interface DataType {
  key: number  ;
  heThongRap:string ;
  tenCumRap:string ;
  diaChi:string ;
  tenRap:string ;
  tenPhim:string ;
  ngayChieuGioChieu:Date ;
  giaVe:number ;
}
type DataIndex = keyof DataType;

const ShowTime = (props: Props) => {
  const { idFilm } = useParams<string>();
  const { phimEdit, danhSachPhimMange } = useSelector(
    (state: RootState) => state.QuanLyPhimReducer
  );
  const { heThongRap, cumRap } = useSelector(
    (state: RootState) => state.QuanLyRapReducer
  );
  const { phimDetail } = useSelector(
    (state: RootState) => state.QuanLyPhimReducer
  );
  const [HTRC, setHTRC] = useState<string>("");
  const [imgSrc, setSrcImg] = useState<string>("");
  const [openCumRap, setOpenCumRap] = useState<boolean| undefined>(undefined);
  const [openNgayChieuGioChieu, setOpenNgayChieuGioChieu] =
    useState<boolean>(false);
  const [openGiaVe, setOpenGiaVe] = useState<boolean>(false);
  const dispatch: DispatchType = useDispatch();
  const frmHTR = useFormik({
    initialValues: {
      heThongRapChieu: "",
    },
    onSubmit: (e) => {},
    validationSchema: Yup.object().shape({
      heThongRapChieu: Yup.string().required(
        "Hệ thống rạp không được bỏ trống !"
      ),
    }),
  });
  const frm = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: Number(idFilm),
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    onSubmit: (values: any) => {
      dispatch(taoLichChieuApi(values));
      console.log(values);
    },
    validationSchema: Yup.object().shape({
      maRap: Yup.string().required("Mã rạp không được bỏ trống !"),
      giaVe: Yup.number()
        .min(1, "Giá vé không được bỏ trống !")
        .required("Giá vé không được bỏ trống !"),
      ngayChieuGioChieu: Yup.string().required(
        "Ngày chiếu giờ chiếu không được bỏ trống !"
      ),
    }),
  });

  const handleChangeHTR = (maHTR: string) => {
    setHTRC(maHTR);
    setOpenCumRap(true);
    dispatch(layThongTinCunRapTheoHeThongApi(maHTR));
  };
  const handleChangeCumRap = (value: string) => {
    frm.setFieldValue("maRap", value);
    setOpenCumRap(false);
    setOpenNgayChieuGioChieu(true);
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    let ngayChieuGioChieu = moment(date).format("DD/MM/YYYY hh:mm:ss");
    frm.setFieldValue("ngayChieuGioChieu", ngayChieuGioChieu);
    setOpenNgayChieuGioChieu(false);
    setOpenGiaVe(true);
  };
  const handleChangeGiaVe = (value: number) => {
    frm.setFieldValue("giaVe", value);
    setOpenGiaVe(false);
  };
  console.log(phimDetail)
  useEffect(() => {
    dispatch(layThongTinHeThongRapShowtimeApi());
    dispatch(getPhimDetailApi(idFilm));
  }, []);
  
  const data: DataType[] = phimDetail?.heThongRapChieu
  ? phimDetail.heThongRapChieu.flatMap((phim, indexPhim) =>
      phim.cumRapChieu.flatMap((cum, indexCum) =>
        cum.lichChieuPhim.map((lich, indexLich) => ({
          key: Number(lich.maLichChieu),
          heThongRap: phim.logo,
          tenCumRap: cum.tenCumRap,
          diaChi: cum.diaChi,
          tenRap: lich.tenRap,
          tenPhim: phimDetail.tenPhim,
          ngayChieuGioChieu: lich.ngayChieuGioChieu,
          giaVe: lich.giaVe,
        }))
      )
    )
  : [];
  console.log(data)
  const columns: ColumnsType<DataType> = [
    {
      title: "Hệ thống rạp",
      key: "heThongRap",
      render:(text, record, index)=>{
        return <img src={record.heThongRap} width={50} alt="" />
      }
    },
    {
      title: "Tên cụm rạp",
      key: "tenCumRap",
      render:(text, record, index)=>{
        return <p>{record.tenCumRap}</p>
      }
    },
    {
      title: "Địa chỉ",
      key: "diaChi",
      render:(text, record, index)=>{
        return <p>{record.diaChi}</p>
      },
      width:"20%"
    },
    {
      title: "Tên Rạp",
      key: "tenRap",
      render:(text, record, index)=>{
        return <p>{record.tenRap}</p>
      }
    },
    {
      title: "Tên phim",
      key: "tenPhim",
      render:(text, record, index)=>{
        return <p>{record.tenPhim}</p>
      }
    },

    {
      title: "Ngày chiếu giờ chiếu",
      key: "ngayChieuGioChieu",
      render:(text, record, index)=>{
        return <p>{moment(record.ngayChieuGioChieu).format("DD/MM/YYYY hh:mm:ss")}</p>
      }
    },
    {
      title: "Giá vé",
      key: "giaVe",
      render:(text, record, index)=>{
        return <p>{record.giaVe}</p>
      }
    },
  ];
  return (
    <div className="showtime_film_form">
      <div
      className="showtime_top"
      style={{
        backgroundImage: `url('${phimDetail?.hinhAnh}')`,
        backgroundRepeat: "repeat",
      }}
    >
         <div
        className="GlassinfoFilm"
        style={{
          height: "100%",
          width:'100%',
          backdropFilter: "blur(7px)",
        }}
      >
      <ArrowLeftOutlined
        style={{ fontSize: 20, color:'#fff' }}
        onClick={() => {
          history.push("/manage/manageFilm");
        }}
      />
      <h3>TẠO LỊCH CHIẾU</h3>
   
        {/* <img src={phimDetail?.hinhAnh}  alt="" /> */}

        <form
          className="form"
          onSubmit={(e) => {
            frm.handleSubmit(e);
            frmHTR.handleSubmit(e);
          }}
        >
          <div className="content_form">
            <div className="edit_left">
              <p>Hệ thống rạp</p>
              <Select
                placeholder="Chọn hệ thống rạp"
                onChange={handleChangeHTR}
                options={heThongRap.map((htr, index) => ({
                  label: htr.tenHeThongRap,
                  value: htr.maHeThongRap,
                }))}
              />
              {frmHTR.errors.heThongRapChieu ? (
                <p className="errors">Hệ thống rạp không được bỏ trống !</p>
              ) : (
                ""
              )}
              <p>Cụm rạp</p>
              <Select
                open={openCumRap===undefined ? undefined : openCumRap ===true? true : false}
                notFoundContent="Bạn phải chọn hệ thống trước !"
                placeholder="Chọn cụm rạp"
                options={cumRap.map((cr, index) => ({
                  label: cr.tenCumRap,
                  value: cr.maCumRap,
                }))}
                onChange={handleChangeCumRap}
              />
              {frm.errors.maRap !== "" ? (
                <p className="errors">{frm.errors.maRap?.toString()}</p>
              ) : (
                ""
              )}
            </div>
            <div className="edit_right">
              <p>Ngày chiếu giờ chiếu</p>
              <DatePicker
                open={openNgayChieuGioChieu}
                format={"DD/MM/YYYY hh:mm:ss"}
                showTime
                onChange={onChangeDate}
              />
              {frm.errors.ngayChieuGioChieu !== "" ? (
                <p className="errors">
                  {frm.errors.ngayChieuGioChieu?.toString()}
                </p>
              ) : (
                ""
              )}
              <p>Giá vé</p>
              <Select
                open={openGiaVe}
                placeholder="Giá vé"
                options={giaVe}
                onChange={handleChangeGiaVe}
              />
              {frm.errors.giaVe !== "" ? (
                <p className="errors">{frm.errors.giaVe?.toString()}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <button className="add" type="submit">
            Tạo
          </button>
        </form>
      </div>
    </div>
    <div className="showtime_bottom">
      <h4>Lịch chiếu đã tạo </h4>
    <Table columns={columns} dataSource={data} />
    </div>
    </div>
  );
};

export default memo(ShowTime);
