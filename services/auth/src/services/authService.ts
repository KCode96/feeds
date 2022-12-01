import { User } from '../models';

type Register = {
    username: string;
    email: string;
    password: string;
};

type Login = {
    email: string;
    password: string;
};

export const registerUser = async ({ username, email, password }: Register) => {
    const user = await User.findOne({ email }).select('-password');

    if (user) throw new Error(`${email} already registered`);

    const newUser = await await User.create({ username, email, password });

    return newUser;
};

export const loginUser = async ({ email, password }: Login) => {
    const user = await User.findOne({ email }).select('-password');

    if (!user) throw new Error(`${email} is not registered yet`);

    const isMatch = await user.matchPassword(password);

    if (!isMatch) throw new Error(`Invalid credentials`);

    const token = user.getSignedJwtToken(user.id);

    return token;
};

export const forgotPassword = (email: string) => {};
