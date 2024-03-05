import React, { useEffect, useRef } from 'react'
import Header from '../../components/Header/Header'
import {Outlet, useLocation} from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import { array } from 'yup'
import { setLoading } from '../../redux/reducer/LoadingReducer'
import { useDispatch } from 'react-redux'
type Props = {}

const HomeTemplate = (props: Props |any) => {
  const lichChieuRef=useRef('lichChieuRef');
  const cumRapRef=useRef<any>('cumRapRef');
  const tinTucRef=useRef('tinTucRef');
  const location =useLocation();
  useEffect(()=>{
    window.scrollTo(0,0)
  })
 

  return (
    <>
        <Header />
        <main >
            <Outlet/>
        </main>
        <Footer/>
    </>
  )
}

export default HomeTemplate