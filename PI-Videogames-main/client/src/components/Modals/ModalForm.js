import React from "react";
import s from "./ModalForm.module.css";
import sonic from '../Icons/sonic.png';


// Modal.setAppElement("#root");

export default function ModalForm() {

  return (
    <div className={s.mymodal}>

        <div className={s.content}>
                <img className={s.sonic} src={sonic} alt='mario'></img> 
        </div>
        
    </div>
  );
}