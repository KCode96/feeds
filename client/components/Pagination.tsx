import { getMoreArticles } from '@/features/articleSlice';
import { useAppDispatch } from '@/store/hooks';
import { useState } from 'react';
import { Article } from 'types';
import { getToken } from 'utilities/token';

export default function Pagination({ data }: { data: Article[] }) {
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 3;
    const pageNumbers = Array.from(
        Array(Math.ceil(data.length / pageSize) + 1).keys()
    );

    const dispatch = useAppDispatch();
    const token = getToken();

    const handlePrevious = () => {
        if (currentPage == 1) return;

        setCurrentPage(currentPage - 1);

        dispatch(
            getMoreArticles({
                token,
                isGlobal: true,
                offset: (currentPage - 1) * pageSize,
                limit: 3,
            })
        );
    };

    const handleNext = () => {
        setCurrentPage(pageNumbers.length);

        dispatch(
            getMoreArticles({
                isGlobal: true,
                offset: (currentPage - 1) * pageSize,
                limit: 3,
            })
        );
    };

    return (
        <div className="flex mt-6 flex-wrap">
            <button
                className={`${
                    currentPage == 1 && 'hidden'
                } px-4 py-2 rounded-l border border-r-0 hover:bg-gray-500/10`}
                onClick={handlePrevious}
            >
                Previous
            </button>
            {pageNumbers.map(num => {
                return (
                    <button
                        key={num}
                        className={`${
                            currentPage == num + 1
                                ? 'bg-blue-500 text-white  hover:bg-blue-500'
                                : ' hover:bg-gray-500/10'
                        }   cursor-pointer py-2 px-4 border border-gray-500/20 text-blue-600 transition`}
                        onClick={() => {
                            setCurrentPage(num + 1);
                        }}
                    >
                        {num + 1}
                    </button>
                );
            })}
            <button
                className="px-4 py-2 rounded-r border border-l-0 hover:bg-gray-500/10"
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    );
}
