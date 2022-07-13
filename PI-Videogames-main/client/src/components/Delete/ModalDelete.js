import React from "react";
import s from "./ModalDelete.module.css";
import mario from '../Icons/mario.png';

export default function ModalDelete() {

  const [show, setShow] = React.useState(true);

  const handleOnCancel = () => {
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