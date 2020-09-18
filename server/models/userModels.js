const mongoos = require('mongoose');
const bcrypt = require('bcrypt');
const { string } = require('joi');
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
        },
        accTokn: {
            type: String,
        },
        refreTokn: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        accTokn: {
            type: String,
        },
        refreTokn: {
            type: String
        }
    }

}, { timestamps: true });

//  before save called
userSchema.pre('save', async function (next) {
    if (this.method !== 'local') {
        next();
    }
    try {
        // generate salt with 12 rounds
        const salt = await bcrypt.genSalt(12);

        // password hash 
        const passwordHash = await bcrypt.hash(this.local.password, salt);

        // assign generated hashed password to password
        this.local.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

// password comparison takes in new password and return a boolean
userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
};

// Create a model
const User = mongoos.model('user', userSchema);

// Export Model
module.exports = User;