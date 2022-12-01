import { User } from '../models';

export const getAllUsers = async () => {
    return await User.find().select('-password');
};

export const getUserById = async (id: string) => {
    return await User.findById(id).select('-password');
};
