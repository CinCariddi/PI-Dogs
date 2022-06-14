import React, { useEffect, useState } from "react";
import '../CSS/Pagination.css'

export default function Paginado({dogPerPage, allDogs, paginado}) {
    const [pageNumber, setPageNumber] = useState([]);

    useEffect(() => {
        const pageNumbers = [];
        for(let i = 0; i < Math.ceil(allDogs/dogPerPage); i++) {
            pageNumbers.push(i+1)
        }
        setPageNumber(pageNumbers)
    }, [allDogs, dogPerPage])

    return (
        <div>
            <ul>
                {
                pageNumber && pageNumber.map(number => (
                    <button onClick={() => paginado(number)} className= 'pagination' key={`${number}paginado`}>{number}</button>
                ))
                }
            </ul>
        </div>
    )
}