import React from "react";
import s from "./ModalDelete.module.css";
import mario from '../Icons/mario.png';
import { deleteVideogame, getAllVideogames } from '../../actions';
import {  useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ryuk from '../Icons/ryuk.png';
import gameover from '../Icons/gameover2.png';





// Modal.setAppElement("#root");

export default function ModalDelete({createdOnDb, id}) {

   const [show, setShow] = React.useState(false);
   const [success, setSuccess] = React.useState(false);
   const history = useHistory();


   const dispatch = useDispatch();

   
  const handleOnCancel = () => {
       setShow(false);
  }

  const handleOnDelete = () => {
    setShow(false);
    setSuccess(true);
    dispatch(deleteVideogame(id))
    dispatch(getAllVideogames())
    setTimeout(() => {
      history.push('/home')
  }, 2500)
}

 const handleOnClick = () => {
    setShow(true)
 }


  return (
    <div>

        <div className={success ? s.success : s.notShow}>
          <div className={s.firstI}>
                <img src={gameover} alt='gameover'></img>
                <br></br>
                <h3>videogame deleted</h3>
          </div>
                <img className={s.ryuk} src={ryuk} alt='ryuk'></img> 
        </div>
        <div className={show ? s.mymodal : s.notShow}>

            <div className={s.content}>
                    <div>
                        <h2>Are you sure you want to delete this videogame?</h2>
                        <p>You will not be able to get it back again.</p>
                        <button onClick={() => handleOnCancel()}>CANCEL</button>
                        <button onClick={() => handleOnDelete()}>DELETE</button>
                    </div>
                    <div><img className={s.mario} src={mario} alt='mario'></img> </div>
            </div>  
        </div>
        {createdOnDb && <div className={s.deleteGame}><button onClick={() => handleOnClick()}>DELETE GAME</button></div>}
    </div>
  );
}