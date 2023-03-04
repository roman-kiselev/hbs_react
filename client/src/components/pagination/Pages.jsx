import React from 'react';
import {Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../../features/testMeters/testWaterMeterSlice";

const Pages = ({totalCount, limit, currentPage}) => {
    const dispatch = useDispatch()
    // const {totalCount} = useSelector((state) => state.mainTable)
    // const {limit} = useSelector((state) => state.mainTable)
    // const {currentPage} = useSelector((state) => state.mainTable)
    const pageCount = Math.ceil(totalCount / limit)
    const pages = []


    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

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