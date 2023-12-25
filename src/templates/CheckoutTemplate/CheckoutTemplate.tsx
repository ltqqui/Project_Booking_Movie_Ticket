import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import CheckoutHeader from "../../components/CheckoutHeader/CheckoutHeader";
import { USER_LOGIN, settings } from "../../utils/settings/config";
import { history } from "../../utils/lib/libs";
import { Modal } from "antd";

type Props = {};

const CheckoutTemplate = (props: Props) => {
  const errorCheckout = () => {
    console.log(123);
    Modal.confirm({
      title: "Quyền truy cập ",
      content:
        "Bạn có muốn đăng nhập để đặt vé ?",
      onOk: () => {
        history.push("/login");
      },
      onCancel:()=>{
        history.back();
      }
    });
  };

  if (settings.getStore(USER_LOGIN)) {
    return (
      <>
        <CheckoutHeader />
      </>
    );
  } else return <>{errorCheckout()}</>;
};

export default CheckoutTemplate;
