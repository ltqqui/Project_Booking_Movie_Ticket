import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { DispatchType } from '../../redux/configStore'
import { useDispatch } from 'react-redux'
import { UserLoginModel, postUserLoginApi } from '../../redux/reducer/QuanLyNguoiDungReducer'
import { useFormik } from 'formik'
import * as Yup from 'yup'
type Props = {}

function Login({}: Props) {
  const dispatch:DispatchType=useDispatch();
  const frm=useFormik<UserLoginModel>({
    initialValues:{
      taiKhoan:'',
      matKhau:''
    },
    onSubmit:(value:UserLoginModel)=>{
      dispatch(postUserLoginApi(value))
    },
     validationSchema:Yup.object().shape({
      taiKhoan:Yup.string().required('Tài khoản không được bỏ trống !'),
      matKhau:Yup.string().required('Mật khẩu không được bỏ trống !'),
     })
  })
  return (
    <div className='login'>
    <form action="" className='form_login' onSubmit={frm.handleSubmit} >
      <h3 >Đăng nhập</h3>
      <div className='taiKhoan'>
          <input name='taiKhoan' type="text"   placeholder='Tên đăng nhập' onChange={frm.handleChange} />
      </div>
      <div className='password'>
          <input name='matKhau' type="password" placeholder='Mật khẩu' onChange={frm.handleChange} />
      </div>  
      <div className='missPass'>
        <p className='text-white text-right'>Quên mật khẩu ? </p>
      </div>
      <div className='submit'>
          <button style={{background:'#fff', width:'100%', padding:'10px', borderRadius:'15px', fontWeight:'600', fontSize:'16px'}}>Đăng nhập</button>
      </div>
      <div className='form_login_bottom'>
        <p className=''>Chưa có tài khoản ? <NavLink to='/register'  className=''>Đăng ký</NavLink></p>
      </div>
    </form>
  </div>
  )
}

export default Login