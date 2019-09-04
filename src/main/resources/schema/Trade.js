module.exports = {
  "required": [
    "accepted",
    "from",
    "reciprocalItems",
    "requestedItems",
    "to"
  ],
  "properties": {
    "from": {
      "type": "integer",
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "to": {
      "type": "integer",
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "accepted": {
      "type": "boolean",
      "default": false
    },
    "requestedItems": {
      "properties": {
        "money": {
          "type": "integer",
          "format": "int32",
          "minimum": -2147483648,
          "maximum": 2147483647
        },
        "titles": {
          "type": "array",
          "items": {
            "type": "integer",
            "format": "int32",
            "minimum": -2147483648,
            "maximum": 2147483647
          }
        }
      }
    },
    "reciprocalItems": {
      "properties": {
        "money": {
          "type": "integer",
          "format": "int32",
          "minimum": -2147483648,
          "maximum": 2147483647
        },
        "titles": {
          "type": "array",
          "items": {
            "type": "integer",
            "format": "int32",
            "minimum": -2147483648,
            "maximum": 2147483647
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};