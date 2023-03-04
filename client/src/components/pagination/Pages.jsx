import React from 'react';
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/testMeters/testWaterMeterSlice";

const Pages = ({ totalCount, limit, currentPage }) => {
    const dispatch = useDispatch()
    // const {totalCount} = useSelector((state) => state.mainTable)
    // const {limit} = useSelector((state) => state.mainTable)
    // const {currentPage} = useSelector((state) => state.mainTable)
    const pageCount = Math.ceil(totalCount / limit)
    const pages = []

    if(pageCount > 5) {
        if(currentPage > 3) {
            for (let i = currentPage-4; i <= currentPage+3; i++) {
                pages.push(i)
                if(i == pageCount) break
            }
        }
        else {
            for (let i = 1; i <= 5; i++) {
                pages.push(i)
                if(i == pageCount) break
            }
        }
    }  else {
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }
    }

    // for (let i = 0; i < pageCount; i++) {
    
    //     pages.push(i + 1)
    // }

    return (
        <Pagination>
            
            {
                pages.map((page) => (
                    <Pagination.Item
                        active={currentPage === page}
                        key={page}
                        onClick={() => dispatch(setCurrentPage(page))}
                    >
                        {page}
                    </Pagination.Item>
                ))
            }
        </Pagination>
    );
};

export default Pages;