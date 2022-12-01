import * as yup from 'yup';

export const getUser = yup.object({
    params: yup.object({
        id: yup.string().required(),
    }),
});
