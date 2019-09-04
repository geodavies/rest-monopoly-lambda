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
    "rent": {
      "type": "array",
      "items": {
        "maxItems": 4,
        "minItems": 4,
        "type": "integer",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      }
    },
    "price": {
      "properties": {
        "purchase": {
          "minimum": -2147483648,
          "type": "integer",
          "format": "int32",
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