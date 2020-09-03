const mongoos = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoos.Schema;

// Create a Schema
const userSchema = new Schema({

    methods: {
        type: [String],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    }

}, { timestamps: true });

//  before save called
userSchema.pre('save', async function (next) {
    try {
        // generate salt with 12 rounds
        const salt = await bcrypt.genSalt(12);

        // password hash 
        const passwordHash = await bcrypt.hash(this.password, salt);

        // assign generated hashed password to password
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

// password comparison takes in new password and return a boolean
userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

// Create a model
const User = mongoos.model('user', userSchema);

// Export Model
module.exports = User;