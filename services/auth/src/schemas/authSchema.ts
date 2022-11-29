import * as yup from 'yup';

export const registerUser = yup.object({
    body: yup.object({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    }),
});

export const loginUser = yup.object({
    body: yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    }),
});

export const forgotPassword = yup.object({
    body: yup.object({
        email: yup.string().email().required(),
    }),
});
