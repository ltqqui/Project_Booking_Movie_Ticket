/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { NavLink, useLocation, Navigate } from "react-router-dom";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configStore";
import {
  ACCESS_TOKEN,
  USER_LOGIN,
  settings,
} from "../../utils/settings/config";
import { history } from "../../utils/lib/libs";
type Props = {};

const Header = (props: Props | any) => {
  console.log(props);
  const [isOpen, setOpen] = useState<boolean>(false);
  const location = useLocation();
  console.log(location.pathname);
  const { userLogin } = useSelector(
    (state: RootState) => state.QuanLyNguoiDungReducer
  );
  return (
    <div className="header">
      <div
        style={{ display: "none" }}
        className={isOpen ? "backgroundDark" : ""}
      ></div>
      <div className="logo">
        <img
          onClick={() => {
            history.push("/home");
          }}
          src="/img/logo/headTixLogo.png"
          alt=""
        />
      </div>
      <div className="menu">
        <div className="menuItem">
          {location.pathname === "/" ? (
            <a href="#lichChieu">Lịch Chiếu</a>
          ) : (
            <a
              onClick={() => {
                history.push("/");
              }}
            >
              Lịch Chiếu
            </a>
          )}
        </div>
        <div className="menuItem">
          {location.pathname === "/" ? (
            <a href="#cumRap">Cụm Rạp</a>
          ) : (
            <a
              onClick={() => {
                history.push("/");
              }}
            >
              Cụm Rạp
            </a>
          )}
        </div>
        <div className="menuItem">
          {location.pathname === "/" ? (
            <a href="#tinTuc">Tin Tức</a>
          ) : (
            <a
              onClick={() => {
                history.push("/");
              }}
            >
              Tin Tức
            </a>
          )}
        </div>
        <div className="menuItem">
          {location.pathname === "/" ? (
            <a href="#ungDung">Ứng dụng</a>
          ) : (
            <a
              onClick={() => {
                history.push("/");
              }}
            >
              Ứng dụng
            </a>
          )}
        </div>
      </div>
      <div className="optionsMenu">
        <div className="optionItem">
          {userLogin.taiKhoan ? (
            <>
              {" "}
              <img
                src={`https://i.pravatar.cc/150?u=${userLogin.taiKhoan}@pravatar.com`}
                alt=""
                onClick={() => {
                  history.push("/profile");
                }}
              />{" "}
              <NavLink to={"/profile"}>{userLogin.taiKhoan}</NavLink>
            </>
          ) : (
            <NavLink to={"/login"}>Đăng nhập</NavLink>
          )}
        </div>
        |
        <div className="optionItem">
          {userLogin.taiKhoan ? (
            <NavLink
              to="/"
              onClick={() => {
                settings.clearStorage(USER_LOGIN);
                settings.clearStorage(ACCESS_TOKEN);
                window.location.reload();
              }}
            >
              Đăng xuất
            </NavLink>
          ) : (
            <NavLink to="/register">Đăng ký</NavLink>
          )}
        </div>
      </div>
      <div
        className="menuMobile"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      {isOpen ? (
        <div className="OpenDrawMenu" style={{ display: "none" }}>
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
              <NavLink to={"/profile"}>{userLogin.taiKhoan}</NavLink>
            </div>
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => {
                setOpen(!isOpen);
              }}
            ></i>
          </div>
          <div className="drawItem">
            <div
              onClick={() => {
                setOpen(false);
              }}
            >
              {location.pathname === "/" ? (
                <a href="#lichChieu">Lịch Chiếu</a>
              ) : (
                <a
                  href="#lichChieu"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Lịch Chiếu
                </a>
              )}
            </div>
            <div
              onClick={() => {
                setOpen(false);
              }}
            >
              {location.pathname === "/" ? (
                <a href="#cumRap">Cụm Rạp</a>
              ) : (
                <a
                  href="#cumRap"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Cụm Rạp
                </a>
              )}
            </div>
            <div
              onClick={() => {
                setOpen(false);
              }}
            >
              {location.pathname === "/" ? (
                <a href="#tinTuc">Tin Tức</a>
              ) : (
                <a
                  href="#tinTuc"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Tin Tức
                </a>
              )}
            </div>
            <div
              onClick={() => {
                setOpen(false);
              }}
            >
              {location.pathname === "/" ? (
                <a href="#ungDung">Ứng Dụng</a>
              ) : (
                <a
                  href="#ungDung"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Ứng Dụng
                </a>
              )}
            </div>
            <div
              onClick={() => {
                setOpen(false);
              }}
            >
              {!userLogin.taiKhoan ? (
                <NavLink to="/login">Đăng nhập</NavLink>
              ) : (
                ""
              )}
            </div>
            <div
              onClick={() => {
                setOpen(false);
              }}
            >
              {userLogin.taiKhoan ? (
                <NavLink
                  to="/"
                  onClick={() => {
                    settings.clearStorage(USER_LOGIN);
                    settings.clearStorage(ACCESS_TOKEN);
                    window.location.reload();
                  }}
                >
                  Đăng xuất
                </NavLink>
              ) : (
                <NavLink to="/register">Đăng ký</NavLink>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="CloseDrawMenu" style={{ display: "none" }}>
          <div className="CloseDrawMenuItem">
            <div className="profile">
              <img
                src={`https://i.pravatar.cc/150?u=${userLogin.taiKhoan}@pravatar.com`}
                alt=""
              />
              <NavLink to={"/profile"}>{userLogin.taiKhoan}</NavLink>
            </div>
            <i
              className="fa-solid fa-circle-xmark"
              onClick={() => {
                setOpen(!isOpen);
              }}
            ></i>
          </div>
          <div className="drawItem">
            <div>Lịch chiếu </div>
            <div>Cụm rạp </div>
            <div>Tin tức </div>
            <div>Ứng dụng </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
