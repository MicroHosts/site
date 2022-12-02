import { useEffect, useState } from "react";

export default function usePaginate(data:any) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        if (data && data.count) {
            setPageCount(Math.ceil(data.count / 5));
        }
    }, [data]);
    return {currentPage, pageCount, setCurrentPage}
}