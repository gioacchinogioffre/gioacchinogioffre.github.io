import React from "react";
import s from './Paginate.module.css'

const Paginate = (props) => {
    const { gamesPerPage, allGames, currentPage, paginate, prevPage, nextPage } = props;

    const pageNumbers = []

  for (let i =1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
        <div className={s.paginate}>
        {currentPage !==1 && (
        <button  type='primary' onClick={() => prevPage()}>{"< Previous"}</button>)}
        {pageNumbers.map((num) => (
          <a key={num} onClick={() => paginate(num)}>{num}</a>
        ))}

        {pageNumbers.length !== currentPage && (
        <button type='primary' onClick={() => nextPage()}>{'> Next'} </button>)}
        </div>
    )
}

export default Paginate;

