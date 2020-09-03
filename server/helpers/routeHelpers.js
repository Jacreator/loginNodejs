const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, resp, next) => {
            var result = schema.validate(req.body);
            if (result.error) {
                return resp.status(400).json(result.error);
            }

            if (!req.value) {
                req.value = {};
            }
            req.value.body = req.body;
            next();
        };
    },
    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().required()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().required().max(25).min(8)
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            repeat_password: Joi.ref('password'),
        })

    }
};