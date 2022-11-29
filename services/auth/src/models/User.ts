import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

UserSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = async function (id: string) {
    return jwt.sign({ id }, JWT_SECRET as string, { expiresIn: '30d' });
};

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    // Hash the password and save it to the database
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

export default User;
