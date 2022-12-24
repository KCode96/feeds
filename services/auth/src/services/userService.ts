import { User } from '../models';
import { Update } from '../types';

export const getAllUsers = async () => {
    return await User.find().select(['-password', '-__v']);
};

export const getUserById = async (id: string) => {
    return await User.findById(id).select(['-password', '-__v']);
};

export const updateUser = async (id: string, body: Update) => {
    const user = await User.findById(id).select(['-password', '-__v']);

    return await User.findByIdAndUpdate(id, body, { new: true }).select([
        '-password',
        '-__v',
    ]);
};

export const deleteUser = async (id: string) => {
    return await User.deleteOne({ id });
};
