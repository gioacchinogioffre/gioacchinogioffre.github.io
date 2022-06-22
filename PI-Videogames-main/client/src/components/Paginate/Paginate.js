import React from "react";
import {Button} from 'antd'

const Paginate = (props) => {
    const { gamesPerPage, allGames, currentPage, paginate, prevPage, nextPage } = props;

    const pageNumbers = []

  for (let i =1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
        <div>
        {currentPage !==1 && (
        <li><Button  type='primary' style={{cursor: 'pointer'}} onClick={() => prevPage()}>Previous</Button></li>)}
        {pageNumbers.map((num) => (
            <div key={num}><a style={{cursor: 'pointer'}} onClick={() => paginate(num)}>{num}</a></div>
        ))}

        {pageNumbers.length !== currentPage && (
        <li><Button type='primary' style={{cursor: 'pointer'}} onClick={() => nextPage()}>Next</Button></li>)}
        </div>
    </nav>
    )
}

export default Paginate;

