module.exports = {
  "properties": {
    "name": {
      "type": "string"
    },
    "owner": {
      "type": "integer",
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "mortgaged": {
      "type": "boolean",
      "default": false
    },
    "price": {
      "properties": {
        "purchase": {
          "type": "integer",
          "format": "int32",
          "default": 0,
          "minimum": -2147483648,
          "maximum": 2147483647
        },
        "mortgage": {
          "minimum": -2147483648,
          "type": "integer",
          "format": "int32",
          "maximum": 2147483647
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};