import React from 'react'
import style from './menuModal.module.scss'
import CloseIcon from '@mui/icons-material/Close';

const MenuModal = ({open, setOpen, children}) => {
    // console.log(props)
  return (
    <>
    {open&&<div className={style.overlay}></div>}
    <div className={!open?`${style.container} ${style.closed}`:style.container} onClick={()=>setOpen(false)}>
        <div className={style.close} >
        <CloseIcon />
        </div>
        {children}
        {/* {props.children} */}
        </div>
    </>
  )
}

export default MenuModal