import React, {useState} from "react";
import "./Pagination.scss";

const Pagination = ({totalUsers, usersPerPage, paginate}) => {
    const pageNumber = [];

    const [active, setActive] = useState(null);

    console.log("Active button", active)

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++){
        pageNumber.push(i);
    }

    
    return (
        <nav>
        <ul className='pagination'>
          {pageNumber.map(number => (
            <li className={active === number ? "active-button" : ""} onClick={() => setActive(number)} key={number} >
              <a onClick={() => paginate(number)} href='!#' className='page'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
}

export default Pagination;