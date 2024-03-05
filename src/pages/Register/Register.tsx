import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik'
import { GROUP } from '../../utils/settings/config'
import _ from 'lodash'
import * as Yup from "yup";
import { DispatchType } from '../../redux/configStore'
import { useDispatch } from 'react-redux'
import { UserRegisterModel, postUserRegisterApi } from '../../redux/reducer/QuanLyNguoiDungReducer'
import { openNotificationWithIcon } from '../../utils/lib/Nontification'
import { history } from '../../utils/lib/libs'
type Props = {}

const Register = (props: Props) => {
  const dispatch:DispatchType=useDispatch();
  const frm=useFormik<UserRegisterModel>({
    initialValues:{
        taiKhoan:'',
        matKhau:'',
        xacNhanMatKhau:'',
        email:'',
        soDt:'',
        hoTen:'',
        maNhom:'GP00'
    },
    onSubmit:(value)=>{
      dispatch(postUserRegisterApi(value))
    },
    validationSchema:Yup.object().shape({
      taiKhoan:Yup.string().required('Tên tài khoản không được bỏ trống !'),
      matKhau:Yup.string().required('Mật khẩu không được bỏ trống!'),
      xacNhanMatKhau:Yup.string().oneOf([Yup.ref('matKhau')],'Mật khẩu xác nhận không khớp !').required('Xác nhận mật khẩu không được bỏ trống!'),
      email:Yup.string().email('Email không hợp lệ!').required('Email không được bỏ trống!'),
      soDt:Yup.string().matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ').required('Số điện thoại không được bỏ trống!'),
      hoTen:Yup.string().required("Họ tên không được bỏ trống!"),
    })
  })
  return (
    <div className='register' >
    <form action="" className='form_register' onSubmit={frm.handleSubmit}>
      <h3 className=''>Đăng ký</h3>
      <div className='taiKhoan' >
          <input onChange={frm.handleChange}  name='taiKhoan' type="text"   placeholder='Tên đăng nhập' />
          <p>{frm.errors.taiKhoan ? frm.errors.taiKhoan : ''}</p>
      </div>
      <div className='email'>
          <input  onChange={frm.handleChange}  type="text" placeholder='Email' name='email' />
          <p>{frm.errors.email ? frm.errors.email : ''}</p>
      </div>
      <div className='soDT'>
          <input  onChange={frm.handleChange}  type="text" placeholder='Số điện thọai' name='soDt'  />
          <p>{frm.errors.soDt ? frm.errors.soDt : ''}</p>
      </div>
      <div className='hoTen'>
          <input  onChange={frm.handleChange}  type="text" placeholder='Họ tên' name='hoTen' />
          <p>{frm.errors.hoTen ? frm.errors.hoTen : ''}</p>
      </div>
      <div className='matKhau'>
          <input  onChange={frm.handleChange}  type="password" placeholder='Mật khẩu' name='matKhau'  />
          <p>{frm.errors.matKhau ? frm.errors.matKhau : ''}</p>
      </div>
      <div className='xacNhanMatKhau'>
          <input  onChange={frm.handleChange}  type="password" placeholder='Nhập lại mật khẩu' name='xacNhanMatKhau'  />
          <p>{frm.errors.xacNhanMatKhau ? frm.errors.xacNhanMatKhau : ''}</p>
      </div>
      <div className='submit'>
          <button >Đăng ký</button>
      </div>
      <div className='form_register_bottom'>
        <p className=''>Chưa có tài khoản ? <NavLink to='/login'  className=''>Đăng nhập</NavLink></p>
      </div>
    </form>
  </div>
  )
}

export default Register