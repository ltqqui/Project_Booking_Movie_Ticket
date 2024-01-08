import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EditPhimModel,
  PhimDetailModel,
  getDanhSacPhimManageApi,
  getFilmEditApi,
  updateFilmApi,
} from "../../redux/reducer/QuanLyPhimReducer";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { history } from "../../utils/lib/libs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { Switch , DatePicker, Space } from "antd";
import parse from 'html-react-parser'
import type { DatePickerProps } from 'antd';
import moment from "moment";
const dateFormat = 'DD/MM/YYYY';
type Props = {};

const EditFilm = (props: Props) => {
  const { idFilm } = useParams<string>();
  const { phimEdit, danhSachPhimMange } = useSelector(
    (state: RootState) => state.QuanLyPhimReducer
  );
  const [imgSrc, setSrcImg]= useState<string>('')
  const dispatch: DispatchType = useDispatch();
  const frm = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: phimEdit?.maPhim ||'',
      tenPhim: phimEdit?.tenPhim ||'',
      biDanh: phimEdit?.biDanh ||'',
      trailer: phimEdit?.trailer ||'',
      hinhAnh: null ,
      moTa: phimEdit?.moTa ||'',
      maNhom: phimEdit?.maNhom ||'',
      hot: phimEdit?.hot || false,
      dangChieu: phimEdit?.dangChieu ||false,
      sapChieu: phimEdit?.sapChieu || false,
      ngayKhoiChieu: moment(phimEdit?.ngayKhoiChieu ).format('DD/MM/YYYY')|| '',
      danhGia: phimEdit?.danhGia ||'',  
    },
    onSubmit: (values:any) => {
      let data= new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          data.append(key, values[key]);
        }
        else {
            if(values.hinhAnh!==null  && values.hinhAnh instanceof Blob){
              data.append('file',values.hinhAnh, values.hinhAnh.name);
            }
        }
      }
      dispatch(updateFilmApi(data))
    },
    validationSchema:Yup.object().shape({
      tenPhim: Yup.string().required('Tên Phim không được bỏ trống !'),
      biDanh:Yup.string().required('Bí danh không được bỏ trống !'),
      trailer:Yup.string().required('Trailer không được bỏ trống !'),
      moTa:Yup.string().required('Mô tả không được bỏ trống !') ,
      ngayKhoiChieu: Yup.string().required("Ngày khởi chiếu không được bỏ trống !")
    })
  });
  const onChangeSwitch = (name:string) => {
    return (value:boolean)=>{
      frm.setFieldValue(name, value)
    }
  };
  const handleChangeFile = async (e:any) => {
    let file = e.target.files[0];
    //đem dữ liệu lưu vào formik
    await frm.setFieldValue('hinhAnh', file)

    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/jpeg') {
      //tạo ra một tối tượng để độc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event:any) => {
        setSrcImg(event.target.result)
      }
    }
  }
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    let ngayKhoiChieu = moment(date).format("DD/MM/YYYY")
    frm.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
  };
  useEffect(() => {
    dispatch(getFilmEditApi(`${idFilm}`));
  }, []);

  return (
    <div className="edit_film_form">
      <ArrowLeftOutlined
        style={{ fontSize: 20 }}
        onClick={() => {
          history.push("/manage/manageFilm");
        }}
      />
      <h3>CẬP NHẬT PHIM</h3>
      <form className="form_edit_film" onSubmit={frm.handleSubmit}>
        <div className="content_form">
          <div className="edit_left">
            <p>Mã phim</p>
            <input
              className="ma_phim"
              type="text"
              name="maPhim"
              placeholder=""
              disabled={true}
              value={frm.values?.maPhim}
              style={{ cursor: "no-drop" }}
            />
            <p>Tên phim</p>
            <input
              className="ten_phim"
              type="text"
              name="tenPhim"
              placeholder=""
              value={frm.values.tenPhim}
              onChange={frm.handleChange}
              />
              {frm.errors.tenPhim !==''? <p className="errors">{frm.errors.tenPhim?.toString()}</p>: <p></p>}
            <p>Bí danh</p>
            <input
              className="bi_danh"
              type="text"
              name="biDanh"
              placeholder=""
              value={frm.values.biDanh}
                onChange={frm.handleChange}
            />
            {frm.errors.tenPhim !==''? <p className="errors">{frm.errors.biDanh?.toString()}</p>: <p></p>}
             <div className="dang_chieu">
             <p>Đang chiếu</p>
             <Switch defaultChecked={frm.values.dangChieu} checked={frm.values.dangChieu} onChange={onChangeSwitch('dangChieu')}  />
             </div>
             <div className="sap_chieu">
             <p>Sắp chiếu</p>
             <Switch defaultChecked={frm.values.sapChieu} checked={frm.values.sapChieu}  onChange={onChangeSwitch('sapChieu')} />
             </div>
             <div className="hot">
             <p>Hot</p>
             <Switch defaultChecked={frm.values.hot} checked={frm.values.hot} onChange={onChangeSwitch('hot')}   />
             </div>
             <p>Đánh giá</p>
             <input type="number" name="danhGia" onChange={frm.handleChange} value={frm.values.danhGia} />
          </div>
          <div className="edit_right">
            <p>Trailer</p>
            <input
              className="trailer"
              type="text"
              name="trailer"
              placeholder=""
              value={frm.values.trailer}
                onChange={frm.handleChange}
            />
            {frm.errors.tenPhim !==''? <p className="errors">{frm.errors.trailer?.toString()}</p>: <p></p>}
            <p>Hình ảnh</p>
            <div className="hinh_anh">
              <input className="" type="file" name="hinhAnh" onChange={handleChangeFile} placeholder="" accept='image/png, image/gif , image/jpg, image/jpeg' />
              {imgSrc===''?<img src={phimEdit?.hinhAnh} width={100} alt="" />: <img src={imgSrc} width={100} alt="" />}
            </div>
            <div className="ngayChieu">
            <p>Ngày chiếu</p>
            <DatePicker  value={moment(frm.values.ngayKhoiChieu, dateFormat)} format={dateFormat} onChange={onChangeDate} />
            {frm.errors.tenPhim !==''? <p className="errors">{frm.errors.ngayKhoiChieu?.toString()}</p>: <p></p>}
            </div>
            <p>Mô tả</p>
           <textarea name="moTa" value={frm.values.moTa} id="" spellCheck={false}  onChange={frm.handleChange}  cols={30} rows={5}></textarea>
           {frm.errors.tenPhim !==''? <p className="errors">{frm.errors.moTa?.toString()}</p>: <p></p>}
          </div>
        </div>
        <button className="update" type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default memo(EditFilm);
