import React from "react";
import s from "./ModalForm.module.css";
import sonic from '../Icons/sonic.png';


export default function ModalForm() {

  return (
    <div className={s.mymodal}>

        <div className={s.content}>
                <img className={s.sonic} src={sonic} alt='sonic'></img> 
        </div>
        
    </div>
  );
}