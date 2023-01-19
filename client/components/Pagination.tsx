import { getMoreArticles } from '@/features/articleSlice';
import { useAppDispatch } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { getToken } from 'utilities/token';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import useArticle from '@/store/hooks/useComment';

export default function Pagination({
    totalCount,
    isGlobal,
    selectedTag,
}: {
    totalCount: number;
    isGlobal: boolean;
    selectedTag: string;
}) {
    const [currentPage, setCurrentPage] = useState(1);

    const { isLoading } = useArticle();

    const pageSize = 5;
    const pageNumbers = Array.from(
        Array(Math.ceil(totalCount / pageSize)).keys()
    );

    useEffect(() => {
        if (isLoading) return;

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
                tag: selectedTag,
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
                className={`px-4 py-2 rounded-l border border-r-0 hover:bg-gray-500/10 disabled:bg-gray-50`}
                onClick={handlePrevious}
                disabled={currentPage == 1}
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
                className={`px-4 py-2 rounded-r border border-l-0 hover:bg-gray-500/10 disabled:bg-gray-50`}
                onClick={handleNext}
                disabled={pageNumbers.length === currentPage}
            >
                <HiOutlineChevronRight />
            </button>
        </div>
    );
}
