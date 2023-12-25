import { CalendarOutlined, DeleteOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm, Popover, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DispatchType, RootState } from "../../redux/configStore";
import { deleteFilmApi, getDanhSacPhimManageApi, getFilmEditApi } from "../../redux/reducer/QuanLyPhimReducer";
import moment from "moment";
import { history } from "../../utils/lib/libs";

type Props = {};
interface DataType {
  key: number;
  maPhim: number;
  tenPhim: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  ngayKhoiChieu: Date;
  danhGia: number;
}
type DataIndex = keyof DataType;

const ManageFilm = (props: Props) => {
  const { danhSachPhimMange } = useSelector(
    (state: RootState) => state.QuanLyPhimReducer
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl]=useState<string|undefined>('');
  const [tenPhim, setTenPhim]= useState<string>('')
  const searchRef=useRef<any>()
  let iframeRef:any=useRef(null)
  const handleOk = async() => {
    await setIsModalOpen(false);
     iframeRef.current.src += '?autoplay=0'
     setUrl('');
 
   };
   console.log(danhSachPhimMange)
 
   const handleCancel = () => {
     setIsModalOpen(false);
     iframeRef.current.src += '?autoplay=0'
     setUrl('')
 
   };
  const dispatch: DispatchType = useDispatch();

  const data: DataType[] = danhSachPhimMange.map((phim, index) => {
    return {
      key: phim.maPhim,
      maPhim: phim.maPhim,
      tenPhim: phim.tenPhim,
      trailer: phim.trailer,
      hinhAnh: phim.hinhAnh,
      moTa: phim.moTa,
      ngayKhoiChieu: phim.ngayKhoiChieu,
      danhGia: phim.danhGia,
    };
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "",
      render: (text, record, index) => {
        return (
          <Fragment>
            <Popconfirm
              placement="topRight"
              title={`Bạn có muốn xóa ${record.tenPhim}`}
              onConfirm={() => {
                dispatch(deleteFilmApi(record.maPhim))
              }}
              okText="Yes"
              cancelText="No"
            >
              {" "}
              <span style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                <DeleteOutlined />
              </span>
            </Popconfirm>
            <NavLink to={`/manage/manageFilm/editFilm/${record.maPhim}`}>
              <EditOutlined style={{ fontSize: 18, marginLeft: 10 }} />
            </NavLink>
            <NavLink to={`/manage/manageFilm/showtime/${record.maPhim}`}><CalendarOutlined style={{ fontSize: 18, marginLeft: 10 }}/></NavLink>
          </Fragment>
        );
      },
      width:'10%'
    },
    {
      title: "Tên phim",
      key: "tenPhim",
      dataIndex: "tenPhim",
    },
    {
      title: "Trailer",
      key: "trailer",
      render: (text, record, index) => {
        return (
          <div className="trailer" onClick={()=>{
            setUrl(record.trailer)
            setTenPhim(record.tenPhim)
            setIsModalOpen(true)
          }}>
            <img className="anh" src={record.hinhAnh} width={50} alt="" />
            <img
              className="icon"
              src="/img/logo/play-video.png"
              width={40}
              alt=""
            />
          </div>
        );
      },
    },
    {
      title: "Mô tả",
      key: "moTa",
      render: (text, record, index) => {
        return (
          <div className="mo_ta">
            <Popover content={record.moTa}  >
              {record.moTa.length > 70 ? record.moTa.slice(0,70) + '...' : record.moTa}
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Ngày chiếu",
      key: "ngayChieu",
      render: (text, record, index) => {
        return (
          <div className="ngay_chieu">
            {moment(record.ngayKhoiChieu).format('DD/MM/YYYY')}
          </div>
        );
      },
    },
    {
      title: "Đánh giá",
      key: "danhGia",
      render:(text, record, index)=>{
        return record.danhGia<5 ? <p style={{color:'red', textAlign:'center'}}>{record.danhGia}</p>: <p style={{textAlign:'center'}}>{record.danhGia}</p>
      },
      width:'15%'
    },
  ];
  useEffect(() => {
    dispatch(getDanhSacPhimManageApi(''));
  }, []);
  return (
    <div className="manageFilm">
      <div className="content_top">
        <button
          className="refresh"
          onClick={() => {
            window.location.reload();
          }}
        >
          <ReloadOutlined /> LÀM MỚI
        </button>
        <button
          className="add_film"
          onClick={() => {
            history.push('/manage/manageFilm/addFilm');
          }}
        >
          <PlusOutlined /> THÊM MỚI PHIM
        </button>
      </div>
      <Search
        className="search"
        placeholder="Nhập tên muốn tìm kiếm"
        onChange={(e) => {
            if(searchRef.current){  
              clearTimeout(searchRef.current)
          }
          searchRef.current=setTimeout(()=>{
            dispatch(getDanhSacPhimManageApi(e.target.value))
          },1000)
        }}
        enterButton
      />
      <div className="table_user">
      <Modal title={`TRAILER: ${tenPhim} `} width={700} bodyStyle={{height:'400px'}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <iframe ref={iframeRef} src={url}   allow="autoplay; fullscreen; picture-in-picture" style={{width:'100%', height:'100%'}}></iframe>
      </Modal>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ManageFilm;
