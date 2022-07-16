import React, {useState} from "react";
import s from './Paginate.module.css'

const Paginate = (props) => {
    const { gamesPerPage, allGames, currentPage, paginate, prevPage, nextPage, index, setIndex } = props;

    const pageNumbers = []

  for (let i =1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  // const [index, setIndex] = useState({startIndex: 0, endIndex: 3})

  return (
        <div className={s.paginate}>
        {currentPage !==1 && ( // si currentPage es distinto de uno, renderizamos el botón de previous. Le pasamos la función prevPage para setear la current page a la anterior.
        <button  type='primary' onClick={() => {prevPage(); setIndex({startIndex: index.startIndex - 1, endIndex: index.endIndex - 1,  })   }}>{"< Previous"}</button>)}

        {/* { pageNumbers.map((num) => (
          <a key={num} onClick={() => paginate(num)}>{num}</a> // Por cada número de página, renderizamos un botón que invocará la función paginate seteando  el número de página actual.
        ))} */}

         { pageNumbers.length>1 && pageNumbers.slice(index.startIndex, index.endIndex).map((num) => (
          <a key={num} onClick={() => paginate(num)}>{num}</a> // Por cada número de página, renderizamos un botón que invocará la función paginate seteando  el número de página actual.
        ))}

          {/* {currentPage !== pageNumbers.length} */}
        
        {(pageNumbers.length !== currentPage && allGames>0) && ( // Si la cantidad de páginas es distinta a la actual, renderizamos el botón de next. Le pasamos la función nextPage para setear la current page a la siguiente.
        <button type='primary' onClick={() => {nextPage(); setIndex({startIndex: index.startIndex + 1, endIndex: index.endIndex + 1,  })  }}>{'Next >'} </button>)}
        </div>
    )
}

export default Paginate;

