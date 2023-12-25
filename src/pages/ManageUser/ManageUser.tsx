import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useRef, useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { deleteUser, getListUserApi } from "../../redux/reducer/QuanLyNguoiDungReducer";
import { NavLink } from "react-router-dom";
import Search from "antd/lib/input/Search";
import { history } from "../../utils/lib/libs";
// import Highlighter from 'react-highlight-words';

interface DataType {
  key: string;
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  matKhau: string;
  maLoaiNguoiDung: string;
}

type DataIndex = keyof DataType;

const ManageUser: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchRef=useRef<any>()
  const { listUser } = useSelector(
    (state: RootState) => state.QuanLyNguoiDungReducer
  );
  const searchInput = useRef<InputRef>(null);
  const data: DataType[] = listUser.map((user, index) => {
    return {
      key: user?.taiKhoan,
      taiKhoan: user.taiKhoan,
      hoTen: user.hoTen,
      email: user.email,
      soDt: user.soDt,
      matKhau: user.matKhau,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
    };
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={`${selectedKeys[0] || ""}`}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "",
      render: (text, record, index) => {
        return (
          <Fragment>
            <Popconfirm
              placement="topRight"
              title={`Bạn có muốn xóa ${record.taiKhoan}`}
              onConfirm={() => {
                dispatch(deleteUser(record.taiKhoan))
              }}
              okText="Yes"
              cancelText="No"
            >
              {" "}
              <span style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                <DeleteOutlined />
              </span>
            </Popconfirm>
            <NavLink to={`/manage/manageUser/editUser/${record.taiKhoan}`}>
              <EditOutlined style={{ fontSize: 18, marginLeft: 10 }} />
            </NavLink>
          </Fragment>
        );
      },
    },
    {
      title: "Tài khoản",
      key: "taiKhoan",
      render: (text, record, index) => {
        return (
          <p
            style={
              record.maLoaiNguoiDung === "QuanTri"
                ? { color: "#f5685e" }
                : { color: "#2fe338" }
            }
          >
            {record.taiKhoan}
          </p>
        );
      },
      ...getColumnSearchProps("taiKhoan"),
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
      render: (text, record, index) => {
        return (
          <p
            style={
              record.maLoaiNguoiDung === "QuanTri"
                ? { color: "#f5685e" }
                : { color: "#2fe338" }
            }
          >
            {record.matKhau}
          </p>
        );
      }
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      render: (text, record, index) => {
        return (
          <p
            style={
              record.maLoaiNguoiDung === "QuanTri"
                ? { color: "#f5685e" }
                : { color: "#2fe338" }
            }
          >
            {record.hoTen}
          </p>
        );
      },
      ...getColumnSearchProps("hoTen"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => {
        return (
          <p
            style={
              record.maLoaiNguoiDung === "QuanTri"
                ? { color: "#f5685e" }
                : { color: "#2fe338" }
            }
          >
            {record.email}
          </p>
        );
      }
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      render: (text, record, index) => {
        return (
          <p
            style={
              record.maLoaiNguoiDung === "QuanTri"
                ? { color: "#f5685e" }
                : { color: "#2fe338" }
            }
          >
            {record.soDt}
          </p>
        );
      }
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text, record, index) => {
        return (
          <p
            style={
              record.maLoaiNguoiDung === "QuanTri"
                ? { color: "#f5685e" }
                : { color: "#2fe338" }
            }
          >
            {record.maLoaiNguoiDung}
          </p>
        );
      }
    },
  ];
  const dispatch: DispatchType = useDispatch();
  useEffect(() => {
    dispatch(getListUserApi({maLoaiNguoiDung:'',value:''}));
  }, []);

  return (
    <div className="manageUser">
      <div className="content_top">
        <button className="refresh" onClick={()=>{
          window.location.reload()
        }}>
          <ReloadOutlined /> LÀM MỚI
        </button>
        <button className="add_user" onClick={()=>{
          history.push('/manage/manageUser/addUser');
        }}>
          <UserAddOutlined /> THÊM USER
        </button>
        <button className="customer" onClick={()=>{
          dispatch(getListUserApi({maLoaiNguoiDung:'KhachHang',value:''}));
        }}>USER KHÁCH HÀNG</button>
        <button className="admin" onClick={()=>{
          dispatch(getListUserApi({maLoaiNguoiDung:'QuanTri',value:''}));
        }}>USER QUẢN TRỊ</button>
      </div>
      <Search
        className="search"
        placeholder="Nhập tên muốn tìm kiếm"
        onChange={(e) => {
          if(searchRef.current){
            clearTimeout(searchRef.current)
        }
        searchRef.current=setTimeout(()=>{
          dispatch(getListUserApi({maLoaiNguoiDung:'', value:e.target.value}))
        },1000)
        }}
        enterButton
      />
      <div className="table_user">
      <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ManageUser;
