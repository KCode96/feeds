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

export const followUser = async (id: string, followerId: string) => {
    const user = await User.findById(id).select(['-password', '-__v']);

    if (!user) return null;

    let followers = [...user.followers];

    // check if user already followed
    if (followers.findIndex(f => f == followerId) == 0) return null;

    followers = [...followers, followerId];
    const followersCount = user.followersCount + 1;

    return await User.findByIdAndUpdate(
        id,
        {
            followersCount,
            followers,
        },
        { new: true }
    ).select(['-password', '-__v']);
};

export const unfollowUser = async (id: string, followerId: string) => {
    const user = await User.findById(id).select(['-password', '-__v']);

    if (!user) return null;

    let followers = [...user.followers];

    if (followers.findIndex(f => f == followerId) != 0) return null;

    followers.splice(followerId as any);
    const followersCount = user.followersCount - 1;

    return await User.findByIdAndUpdate(
        id,
        {
            followersCount,
            followers,
        },
        { new: true }
    ).select(['-password', '-__v']);
};
