import React,{useState} from 'react'
import {
  LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlaySquareOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Avatar, Col, Layout, Menu, Modal, Row } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
import ManageUser from '../../pages/ManageUser/ManageUser';
import { NavLink, Outlet } from 'react-router-dom';
import { history } from '../../utils/lib/libs';
import { ACCESS_TOKEN, USER_LOGIN, settings } from '../../utils/settings/config';
  const { Header, Sider, Content } = Layout;
type Props = {}

const ManageTemplate = (props: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {userLogin}= useSelector((state:RootState)=> state.QuanLyNguoiDungReducer);
    const [isOpen,setOpen] =useState('')
    
    const errorManageMent = () => {
      Modal.confirm({
        title: "Quyền truy cập ",
        content:
          "Bạn không có quyền vào trang này !",
        onOk: () => {
          history.back();
        },
        cancelButtonProps: { style: { display: 'none' } }
      });
    };
  if(userLogin.maLoaiNguoiDung==='QuanTri'){
    return (
      <div className='manageTemplate'>
           <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" >
        <img src='/img/logo/headTixLogo.png' onClick={()=>{history.push('/home')}} alt='' />
          </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['2']}
          items={[
            {
              key: '',
              icon: '',
              label: <div className='info_user'>
                  <img   src={`https://i.pravatar.cc/150?u=${userLogin.taiKhoan}@pravatar.com`} alt="" />
                  <h3>{userLogin.hoTen}</h3>
                  <p>Senior Developer</p>
              </div>,
            },
            {
              key: '2',
              icon:<UserOutlined/>,
              label: <NavLink to={'/manage/manageUser'}>Người dùng</NavLink>,
              // children:<ManageUser/>
            },
            {
              key: '3',
              icon: <PlaySquareOutlined />,
              label: <NavLink to={'/manage/manageFilm'}>Phim</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="logo" style={{display:'none'}} >
        <img src='/img/logo/headTixLogo.png' onClick={()=>{history.push('/home')}} alt='' />
  
          </div>
          <div className="icon_bar">
          <i className="fa-solid fa-bars" onClick={()=>{
            setOpen('true')
          }}></i>
          </div>
          {isOpen ==='true'? <div className="OpenDrawMenu" style={{ display: "none" }}>
            <div className="OpenDrawMenuItem">
              <div
                className="profile"
                onClick={() => {
                  history.push("/profile");
                }}
              >
                <img
                  src={`https://i.pravatar.cc/150?u=${userLogin.taiKhoan}@pravatar.com`}
                  alt=""
                />
                 <h3>{userLogin.hoTen}</h3>
                  <p>Senior Developer</p>
              </div>
              <i
                className="fa-solid fa-circle-xmark"
                onClick={() => {
                  setOpen('false')
                }}
              ></i>
            </div>
            <div className="drawItem">
              <div
                onClick={() => {
                  setOpen('false')
                }}
              >
                <NavLink to={'/manage/manageUser'}>Quản lý người dùng</NavLink>
              </div>
            </div>
            <div className="drawItem">
              <div
                onClick={() => {
                  setOpen('false')
                }}
              >
                <NavLink to={'/manage/manageUser/addUser'}>Thêm người dùng</NavLink>
              </div>
            </div>
            <div className="drawItem">
              <div
                onClick={() => {
                  setOpen('false')
                }}
              >
                <NavLink to={'/manage/manageFilm'}>Quản lý Phim</NavLink>
              </div>
            </div>
            <div className="drawItem">
              <div
                onClick={() => {
                  setOpen('false')
                }}
              >
                <NavLink to={'/manage/manageUser'}>Thêm mới phim</NavLink>
              </div>
            </div>
            <div className="drawItem">
              <div
                onClick={() => {
                  setOpen('false')
                }}
              >
                <NavLink to={'/home'} onClick={()=>{
                  settings.clearStorage(USER_LOGIN);
                  settings.clearStorage(ACCESS_TOKEN);
                  window.location.reload();
                }}>Đăng xuất</NavLink>
              </div>
            </div>
          </div>
          : isOpen==='false' ?  <div className="CloseDrawMenu" style={{ display: "none" }}>
          <div className="CloseDrawMenuItem">
            <div
              className="profile"
              onClick={() => {
                history.push("/profile");
              }}
            >
              <img
                src={`https://i.pravatar.cc/150?u=${userLogin.taiKhoan}@pravatar.com`}
                alt=""
              />
               <h3>{userLogin.hoTen}</h3>
                <p>Senior Developer</p>
            </div>
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => {
                setOpen('false')
              }}
            ></i>
          </div>
          <div className="drawItem">
            <div
              onClick={() => {
              }}
            >
              <a href="#ungDung">Ứng Dụng</a>
            </div>
          </div>
        </div>
          :''}
          <i className="fa-solid fa-right-from-bracket" onClick={()=>{
             settings.clearStorage(USER_LOGIN);
             settings.clearStorage(ACCESS_TOKEN);
             history.push('/home')
             window.location.reload();
          }}></i>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
      </div>
    )
  } 
  else{
    return <>{errorManageMent()}</>
  }
}

export default ManageTemplate