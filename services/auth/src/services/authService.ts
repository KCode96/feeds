import { User } from '../models';
import { Register, Login, User as UserType } from '../types';

export const register = async ({ username, email, password }: Register) => {
    const user = await User.findOne({ email }).select('-password');

    if (user) throw new Error(`${email} already registered`);

    const newUser: Partial<Pick<UserType, 'password'>> =
        await await User.create({
            username,
            email,
            password,
        });

    delete newUser.password;

    return newUser;
};

export const login = async ({ email, password }: Login) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error(`${email} is not registered yet`);

    const isMatch = await user.matchPassword(password);

    if (!isMatch) throw new Error(`Invalid credentials`);

    const token = user.getSignedJwtToken(user.id);

    return token;
};

export const forgotPassword = (email: string) => {};
