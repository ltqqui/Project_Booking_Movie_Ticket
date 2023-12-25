import React from "react";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import Checkout from "../../pages/Checkout/Checkout";
import InforCheckout from "../../pages/InforCheckout/InforCheckout";
import { HomeOutlined } from "@ant-design/icons";
import { history } from "../../utils/lib/libs";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import Home from "../../pages/Home/Home";
import { NavLink } from "react-router-dom";
type Props = {};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: <h5>CHỌN GHẾ & THANH TOÁN</h5>,
    children: <Checkout />,
  },
  {
    key: "2",
    label: <h5>THÔNG TIN GHẾ ĐÃ ĐẶT</h5>,
    children: <InforCheckout />,
  },
];

const CheckoutHeader = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  return (
    <div className="checkout_header">
      <NavLink to={"/home"}>
        <HomeOutlined />
      </NavLink>
      <Tabs className="tab_checkout"
        tabPosition="top"
        defaultActiveKey="1"
        items={items}
      />
    </div>
  );
};

export default CheckoutHeader;
