import React from 'react';
import {Pagination} from "react-bootstrap";

const Pages = ({count, limit, page: arrPage}) => {

    const pageCount = Math.ceil(count / limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination>
            {
                pages.map((page) => (
                    <Pagination.Item active={arrPage === page} key={page}>
                        {page}
                    </Pagination.Item>
                ))
            }
        </Pagination>
    );
};

export default Pages;