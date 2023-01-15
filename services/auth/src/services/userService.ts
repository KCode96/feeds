import { User } from '../models';
import { Update } from '../types';
import { hashPassword } from '../utils';
import { ErrorResponse } from '../utils';

export const getAllUsers = async () => {
    return await User.find().select(['-password', '-__v']);
};

export const getUserById = async (id: string) => {
    return await User.findById(id).select(['-password', '-__v']);
};

export const updateUser = async (id: string, body: Update) => {
    const user = await User.findById(id);

    if (!user) throw new ErrorResponse(`User ${id} not found`, 400);

    if (body.password) user.password = await hashPassword(body.password);
    if (body.bio) user.bio = body.bio;
    if (body.email) user.email = body.email;
    if (body.image) user.image = body.image;
    if (body.username) user.username = body.username;

    // update the password
    return await User.findByIdAndUpdate(id, user, { new: true }).select([
        '-password',
        '-__v',
    ]);
};

export const deleteUser = async (id: string) => {
    return await User.deleteOne({ id });
};

export const followUser = async (id: string, followerId: string) => {
    const user = await User.findById(id).select(['-password', '-__v']);

    if (!user) throw new ErrorResponse(`User ${id} not found`, 400);

    let followers = [...user.followers];

    // check if user already followed
    if (followers.findIndex(f => f == followerId) == 0)
        throw new ErrorResponse(`User already followed`, 400);

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

    if (!user) throw new ErrorResponse(`User ${id} not found`, 400);

    let followers = [...user.followers];

    if (!followers.find(f => f == followerId))
        throw new ErrorResponse(`Follower ${followerId} not found`, 400);

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
