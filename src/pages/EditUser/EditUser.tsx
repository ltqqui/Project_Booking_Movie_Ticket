import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { GROUP } from "../../utils/settings/config";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { UserUpdateAdminModel, UserUpdateModel, getListUserApi, getUserEditApi, layDanhSachLoaiNguoiDung, updateUserAPi } from "../../redux/reducer/QuanLyNguoiDungReducer";
import { history } from "../../utils/lib/libs";
type Props = {};

const EditUser = (props: Props) => {
    const {account}= useParams<string>()
    const dispatch:DispatchType =useDispatch()
    const {userEdit,listUser,danhSachLoaiNguoiDung}= useSelector((state:RootState)=> state.QuanLyNguoiDungReducer);
    console.log(123)
  const frm = useFormik<UserUpdateAdminModel>({
    enableReinitialize: true,
    initialValues: {
      email:userEdit?.email|| "",
      hoTen:userEdit?.hoTen|| "",
      maLoaiNguoiDung:userEdit?.maLoaiNguoiDung || "",
      maNhom: GROUP || "",
      matKhau: userEdit?.matKhau|| '',
      soDt:userEdit?.soDt|| "",
      taiKhoan:userEdit?.taiKhoan|| "",
    },
    onSubmit: (value) => {
        dispatch(updateUserAPi(value))
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tên tài khoản không được bỏ trống !"),
      email: Yup.string()
        .email("Email không hợp lệ!")
        .required("Email không được bỏ trống!"),
      soDt: Yup.string()
        .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
        .required("Số điện thoại không được bỏ trống!"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống!"),
      matKhau:Yup.string().min(8, 'Mật khẩu ít nhất 8 ký tự !.').matches(/[a-zA-Z 0-9]/, 'Mật khẩu chỉ chứa các ký tự la tinh và số !').required("Mật khẩu không được bỏ trống")
    }),
  });
  useEffect(()=>{
    dispatch(layDanhSachLoaiNguoiDung())
    dispatch(getListUserApi({maLoaiNguoiDung:'', value:''}))
    dispatch(getUserEditApi(account));
  },[])
  return (
    <div className="edit_user_form">
      <ArrowLeftOutlined style={{ fontSize: 20 }} onClick={()=>{
        history.push('/manage/manageUser')
      }} />
      <h3>CẬP NHẬT NGƯỜI DÙNG</h3>
      <form className="form_edit_user" onSubmit={frm.handleSubmit}>
        <div className="content_form">
          <div className="edit_left">
            <p>Tài khoản</p>
            <input
              className="tai_khoan"
              type="text"
              name="taiKhoan"
              placeholder=""
              disabled={true}
              value={frm.values?.taiKhoan}
              onChange={frm.handleChange}
              style={{cursor:'no-drop'}}
            />
            <p>Họ và tên</p>
            <input
              className="ho_ten"
              type="text"
              name="hoTen"
              placeholder=""
              value={frm.values.hoTen}
              onChange={frm.handleChange}
            />
            <div>{frm.errors.hoTen}</div>
            <p>Email</p>
            <input
              className="email"
              type="text"
              name="email"
              placeholder=""
              value={frm.values.email}
              onChange={frm.handleChange}
            />
            <div>{frm.errors.email}</div>
          </div>
          <div className="edit_right">
          <p>Số điện thoại</p>
            <input
              className="so_dien_thoai"
              type="text"
              name="soDt"
              placeholder=""
              value={frm.values.soDt}
              onChange={frm.handleChange}
            />
            <div>{frm.errors.soDt}</div>
            <p>Mật khẩu</p>
            <input
              className="mat_khau"
              type="text"
              name="matKhau"
              placeholder=""
              value={frm.values.matKhau}
              onChange={frm.handleChange}
            />
            <div>{frm.errors.matKhau}</div>
            <p>Loại người dùng</p>
                <select name="maLoaiNguoiDung" onChange={frm.handleChange}  value={frm.values.maLoaiNguoiDung} id="">
                    {danhSachLoaiNguoiDung.map((item,index)=>{
                      return <option key={index} value={`${item.maLoaiNguoiDung}`}>{item.tenLoai}</option>
                    })}
                </select>
            <div>{frm.errors.maLoaiNguoiDung}</div>
          </div>
        </div>
        <button className="update" >Cập nhật</button>
      </form>
    </div>
  );
};

export default EditUser;
