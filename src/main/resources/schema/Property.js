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
    "houses": {
      "maximum": 2147483647,
      "minimum": -2147483648,
      "type": "integer",
      "format": "int32",
      "default": 0
    },
    "hotels": {
      "maximum": 2147483647,
      "minimum": -2147483648,
      "type": "integer",
      "format": "int32",
      "default": 0
    },
    "rent": {
      "maxItems": 5,
      "minItems": 5,
      "type": "array",
      "items": {
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
        "house": {
          "minimum": -2147483648,
          "type": "integer",
          "format": "int32",
          "maximum": 2147483647
        },
        "hotel": {
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