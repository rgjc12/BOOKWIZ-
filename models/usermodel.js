const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,  // removes leading/trailing spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensures no duplicate emails
        trim: true,
        lowercase: true,  // Store email in lowercase
        match: [/\S+@\S+\.\S+/, 'is invalid'],  // Email validation regex
    },
    password: {
        type: String,
        required: true,
        minlength: 6,  // Minimum length of password
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Pre-save hook to hash password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();  // If the password field is not modified, skip this hook
    }

    try {
        const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
        this.password = await bcrypt.hash(this.password, salt);  // Hash the password
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create the model from the schema and export it
const User = mongoose.model('User', userSchema);

module.exports = User;
