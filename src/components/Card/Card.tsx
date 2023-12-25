import React ,{ useRef, useState }  from "react";
import { NavLink } from "react-router-dom";
import { DanhSachPhimModel } from "../../redux/reducer/QuanLyPhimReducer";
import { Button, Modal } from 'antd';
type Props = {
  item?:DanhSachPhimModel
};



const Card = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl]=useState<string|undefined>('')
  const [display, setDisplay]=useState<string>('block');
  let iframeRef:any=useRef(null)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async() => {
   await setIsModalOpen(false);
    iframeRef.current.src += '?autoplay=0'
    setUrl('');

  };

  const handleCancel = () => {
    setIsModalOpen(false);
    iframeRef.current.src += '?autoplay=0'
    setUrl('')

  };
  return (
    <div className="card text-left">
     
      <Modal title={`Trailer ${props.item?.tenPhim}`} width={700} bodyStyle={{height:'400px'}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <iframe ref={iframeRef} src={url}   allow="autoplay; fullscreen; picture-in-picture" style={{width:'100%', height:'100%'}}></iframe>
      </Modal>
      <div className="imgFilm">
        <div className="trailer">
          <img src="/img/logo/play-video.png" alt="" onClick={()=>{
            showModal();
            setUrl(props.item?.trailer)
          }} style={{cursor:'pointer'}} />
        </div>
        <img
          className="card-img-top"
          src={props.item?.hinhAnh}
          alt=""
        />
      </div>
      <div className="card-body">
        <h4 className="card-title">
          {" "}
          <span>C18</span> {props.item?.tenPhim}
        </h4>
        <p className="card-text">120 phút - Tix 10</p>
      </div>
      <NavLink to={`/detail/${props.item?.maPhim}`}>Mua vé</NavLink>
    </div>
  );
};

export default Card;
