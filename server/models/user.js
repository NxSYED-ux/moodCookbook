import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// --- User Schema ---
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'User'],
        default: 'Admin'
    },
    accountStatus: {
        type: String,
        enum: ['Freeze', 'Active', 'Pending'],
        default: 'Pending'
    },
    lastLogin: {
        type: Date
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    },
    reset_token: {
        type: String,
        default: null
    },
}, {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true }
});

// Virtual field for full name
userSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// --- Password Hashing with bcrypt ---
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12); // recommended: 10-12 rounds
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// --- Password verification ---
userSchema.methods.verifyPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// --- Account locking for failed attempts ---
userSchema.methods.incrementLoginAttempts = async function () {
    const updates = { $inc: { loginAttempts: 1 } };
    
    if (this.loginAttempts + 1 >= 5) {
        updates.$set = { lockUntil: new Date(Date.now() + 15 * 60 * 1000) }; // 15 min lock
    }
    
    return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = async function () {
    return this.updateOne({
        $set: { loginAttempts: 0 },
        $unset: { lockUntil: 1 }
    });
};

userSchema.virtual('isLocked').get(function () {
    return this.lockUntil && this.lockUntil > Date.now();
});

export default mongoose.model('User', userSchema);