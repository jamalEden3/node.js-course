const Ajv = require("ajv");

const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "pattern": "^[A-Z][a-z]*$"
        },
        "desk":{
            "type": "string",
            "maxLength": 2,
            "minLength": 2
        },
        "required":true
    }
}

const ajv = new Ajv();
let validator = ajv.compile(schema);
module.exports = validator