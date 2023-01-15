import { getMoreArticles } from '@/features/articleSlice';
import { useAppDispatch } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { getToken } from 'utilities/token';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

export default function Pagination({
    totalCount,
    isGlobal,
}: {
    totalCount: number;
    isGlobal: boolean;
}) {
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5;
    const pageNumbers = Array.from(
        Array(Math.ceil(totalCount / pageSize)).keys()
    );

    useEffect(() => {
        fetchMoreArticles();
    }, [currentPage]);

    const dispatch = useAppDispatch();
    const token = getToken();

    const handlePrevious = () => {
        if (currentPage == 1) return;

        setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleClick = (num: number) => {
        setCurrentPage(num);
    };
    function fetchMoreArticles() {
        dispatch(
            getMoreArticles({
                token,
                isGlobal,
                offset: (currentPage - 1) * pageSize,
                limit: pageSize,
            })
        );
    }

    return (
        <div className="flex mt-6 flex-wrap">
            <button
                className={`${
                    currentPage == 1 && 'hidden'
                } px-4 py-2 rounded-l border border-r-0 hover:bg-gray-500/10`}
                onClick={handlePrevious}
            >
                <HiOutlineChevronLeft />
            </button>
            {pageNumbers.map(num => {
                return (
                    <button
                        key={num}
                        className={`${
                            currentPage == num + 1
                                ? 'bg-blue-500 text-white  hover:bg-blue-500'
                                : ' hover:bg-gray-500/10'
                        }   cursor-pointer py-2 px-4 border border-gray-500/20 text-blue-600`}
                        onClick={() => handleClick(num + 1)}
                    >
                        {num + 1}
                    </button>
                );
            })}
            <button
                className={`px-4 py-2 rounded-r border border-l-0 ${
                    pageNumbers.length === currentPage && 'hidden'
                } hover:bg-gray-500/10`}
                onClick={handleNext}
            >
                <HiOutlineChevronRight />
            </button>
        </div>
    );
}
