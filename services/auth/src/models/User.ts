import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String, default: null },
        bio: { type: String, default: null },
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
                            image: this.image,
                            bio: this.bio,
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

/*
virtually transform _id to id without impact on the db
*/
UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

UserSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

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
