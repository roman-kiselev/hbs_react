import { Pagination } from "react-bootstrap";

const Pages = ({ totalCount, limit, currentPage, clickAction }) => {
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];

    if (pageCount > 5) {
        if (currentPage > 3) {
            for (let i = currentPage - 3; i <= currentPage + 3; i++) {
                pages.push(i);
                if (i === pageCount) break;
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
                if (i === pageCount) break;
            }
        }
    } else {
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }
    }

    return (
        <Pagination>
            {pages.map((page) => (
                <Pagination.Item
                    active={currentPage === page}
                    key={page}
                    //onClick={() => dispatch(setCurrentPage(page))}
                    onClick={() => clickAction(page)}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};

export default Pages;
