import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { Tabs, Modal } from "antd";
import { useDispatch } from "react-redux";
import type { TabsProps } from "antd";
import { useFormik } from "formik";
import * as Yup from 'yup'
import {
  UserInformationModel,
  ThongTinDATVe,
  getUserInformation,
  updateUserInformation,
  UserUpdateModel,
} from "../../redux/reducer/QuanLyNguoiDungReducer";
import { GROUP } from "../../utils/settings/config";
import moment from "moment";
import _ from "lodash";
import { UpSquareOutlined } from "@ant-design/icons";
import { history } from "../../utils/lib/libs";
type Props = {};

const Profile = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const [isModal, setIsModal] = useState<boolean>(false);
  const { userLogin, userInfomation } = useSelector(
    (state: RootState) => state.QuanLyNguoiDungReducer
  );
  const frm = useFormik<UserUpdateModel>({
    enableReinitialize: true,
    initialValues: {
      email: userInfomation?.email || "",
      hoTen: userInfomation?.hoTen || "",
      maLoaiNguoiDung:
        userInfomation?.loaiNguoiDung === "Quản trị"
          ? "QuanTri"
          : "KhachHang" || "",
      maNhom: GROUP || "",
      matKhau: userInfomation?.matKhau || "",
      soDT: userInfomation?.soDT || "",
      taiKhoan: userInfomation?.taiKhoan || "",
    },
    onSubmit: (values: UserUpdateModel) => {
      console.log(values);
      dispatch(updateUserInformation(values));
    },
    validationSchema:Yup.object().shape({
      taiKhoan:Yup.string().required('Tên tài khoản không được bỏ trống !'),
      email:Yup.string().email('Email không hợp lệ!').required('Email không được bỏ trống!'),
      soDT:Yup.string().matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ').required('Số điện thoại không được bỏ trống!'),
      hoTen:Yup.string().required("Họ tên không được bỏ trống!"),
    })
  });

  const frmChangePassword = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit(values, formikHelpers) {
      const changeContent:UserUpdateModel={
        email: userInfomation?.email || "",
        hoTen: userInfomation?.hoTen || "",
        maLoaiNguoiDung:
          userInfomation?.loaiNguoiDung === "Quản trị"
            ? "QuanTri"
            : "KhachHang" || "",
        maNhom: GROUP || "",
        matKhau: values.newPassword || "",
        soDT: userInfomation?.soDT || "",
        taiKhoan: userInfomation?.taiKhoan || "",
      }
      console.log(values)
      dispatch(updateUserInformation(changeContent));
    },
  });
  useEffect(() => {
    dispatch(getUserInformation());
  }, []);

  const renderTable = () => {
    let stt = 1;
    let ii = 0;
    return userInfomation?.thongTinDatVe.map((item, index) => {
      return item.danhSachGhe.map((ghe, indexGhe) => {
        return (
          <tr key={ii++}>
            <td>{stt++}</td>
            <td>{item.tenPhim}</td>
            <td>{item.thoiLuongPhim} phút</td>
            <td>
              {moment(item.ngayDat).format("DD/MM/YYYY")},{" "}
              {moment(item.ngayDat).format("hh:mm A")}
            </td>
            <td>
              {ghe?.tenHeThongRap}, {ghe?.tenRap}
            </td>
            <td>{item.maVe}</td>
            <td>{ghe.tenGhe}</td>
            <td>{item.giaVe}</td>
          </tr>
        );
      });
    });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <h5>THÔNG TIN TÀI KHOẢN</h5>,
      children: (
        <form className="form_profile" onSubmit={frm.handleSubmit}>
          <p>Tài khoản</p>
          <input
            className="tai_khoan"
            type="text"
            name="taiKhoan"
            placeholder=""
            disabled={true}
            value={frm.values?.taiKhoan}
            onChange={frm.handleChange}
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
          <p>Số điện thoại</p>
          <input
            className="so_dien_thoai"
            type="text"
            name="soDT"
            placeholder=""
            value={frm.values.soDT}
            onChange={frm.handleChange}
          />
          <div>{frm.errors.soDT}</div>
          <br />
          <div
            className="change_password"
            onClick={() => {
              setIsModal(true);
            }}
          >
            Đổi mật khẩu
          </div>
          <button className="update">Cập nhật</button>
        </form>
      ),
    },
    {
      key: "2",
      label: <h5>LỊCH SỬ ĐẶT VÉ</h5>,
      children: (
        <div className="info_table">
          <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên phim</th>
              <th>Thời lượng phim</th>
              <th>Ngày đặt</th>
              <th>Tên rạp</th>
              <th>Mã vé </th>
              <th>Tên ghế</th>
              <th>Giá vé</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
        </div>
      ),
    },
  ];
  return (
    <div className="profile">
      <Modal
        open={isModal}
        okText=""
        cancelText="Hủy"
        onCancel={() => {
          setIsModal(false);
        }}
      >
       <form action="" onSubmit={frmChangePassword.handleSubmit} >
       <p>Nhập vào mật khẩu cũ</p>
        <input
          type="password"
          name="oldPassword"
          onChange={frmChangePassword.handleChange}
        />
        <p
          style={
            frmChangePassword.values.oldPassword === frm.values.matKhau
              ? { display: "block" }
              : { display: "none" }
          }
        >
          Mật khẩu mới
        </p>
        <input
          type="password"
          name="newPassword"
          onChange={frmChangePassword.handleChange}
          style={
            frmChangePassword.values.oldPassword === frm.values.matKhau
              ? { display: "block" }
              : { display: "none" }
          }
        />
        <p
          style={
            frmChangePassword.values.oldPassword === frm.values.matKhau
              ? { display: "block" }
              : { display: "none" }
          }
        >
          Xác nhận mật khẩu
        </p>
        <input
          type="password"
          name="confirmPassword"
          onChange={frmChangePassword.handleChange}
          style={
            frmChangePassword.values.oldPassword === frm.values.matKhau
              ? { display: "block" }
              : { display: "none" }
          }
        />
        {frmChangePassword.values.newPassword!== frmChangePassword.values.confirmPassword ? <p style={{color:'red', fontWeight:"400"}}>Mật khẩu chưa khớp !</p>: ''}
        <button className="update" type="submit" disabled={frmChangePassword.values.newPassword===frmChangePassword.values.confirmPassword && frmChangePassword.values.newPassword!=='' && frmChangePassword.values.confirmPassword!=='' ? false : true}  style={{
          cursor:frmChangePassword.values.newPassword===frmChangePassword.values.confirmPassword && frmChangePassword.values.newPassword!=='' && frmChangePassword.values.confirmPassword!=='' ? '' : 'no-drop',
          display:frm.values.matKhau===frmChangePassword.values.oldPassword? 'block' :'none'
        }} onClick={(e)=>{
            setIsModal(false)
          }}>Cập nhật</button>
       </form>
      </Modal>
      <div className="content">
        <div className="profile_left">
          <img
            src={`https://i.pravatar.cc/150?u=${userLogin.taiKhoan}@pravatar.com`}
            alt="ht"
          />
          {userLogin.maLoaiNguoiDung==='QuanTri' ? <button onClick={()=>{
            history.push('/manage/manageUser')
          }}><UpSquareOutlined  style={{fontSize:25, fontWeight:500, marginRight:5}}/> TỚI TRANG QUẢN TRỊ</button> : ''}
          <div className="activity">
            <table>
              <tbody>
                <tr>
                  <th>
                    Số lần thanh toán{" "}
                    <span>
                      {userInfomation?.thongTinDatVe
                        .reduce((total, lan) => {
                          return total + lan.danhSachGhe.length;
                        }, 0)
                        .toLocaleString()}
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>
                    Tổng tiền{" "}
                    <span>
                      {userInfomation?.thongTinDatVe
                        .reduce((total, lan) => {
                          return total + lan.giaVe * lan.danhSachGhe.length;
                        }, 0)
                        .toLocaleString()}{" "}
                      VND
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="profile_right">
          <Tabs items={items} defaultActiveKey="1" tabPosition="top" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
