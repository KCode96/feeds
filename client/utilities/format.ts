import dayJs from 'dayjs';

export const formatDate = (date: any) => {
    return dayJs(date).format('MMMM D, YYYY').toString();
};
