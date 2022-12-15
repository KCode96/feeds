import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        methods: {
            matchPassword: async function (password: string) {
                return await bcrypt.compare(password, this.password);
            },
            getSignedJwtToken: function (id: string) {
                return jwt.sign(
                    {
                        user: {
                            id,
                            username: this.username,
                            email: this.email,
                            role: this.role,
                            createdAt: this.createdAt,
                            updatedAt: this.updatedAt,
                        },
                    },
                    JWT_SECRET as string,
                    {
                        expiresIn: '30d',
                    }
                );
            },
        },
    }
);

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
