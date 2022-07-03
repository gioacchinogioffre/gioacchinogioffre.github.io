import React from "react";
import s from "./ModalDelete.module.css";
import mario from '../Icons/mario.png';
import { deleteVideogame } from '../../actions';
import {  useDispatch } from 'react-redux';




// Modal.setAppElement("#root");

export default function ModalDelete() {

   const [show, setShow] = React.useState(true);

   const dispatch = useDispatch();

   
  const handleOnCancel = () => {
       setShow(false);
  }

  const handleOnDelete = () => {
    setShow(false);
}


  return (
    <div className={show ? s.mymodal : s.notShow}>

        <div className={s.content}>
                <div>
                    <h2>Are you sure you want to delete this videogame?</h2>
                    <p>You will not be able to get it back a</p>
                    <button onClick={() => handleOnCancel()}>CANCEL</button>
                    <button>DELETE</button>
                </div>

                <div><img className={s.mario} src={mario} alt='mario'></img> </div>
        </div>
        
    </div>
  );
}