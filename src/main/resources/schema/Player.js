module.exports = {
  "properties": {
    "name": {
      "type": "string"
    },
    "money": {
      "type": "integer",
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "position": {
      "maximum": 2147483647,
      "minimum": -2147483648,
      "type": "integer",
      "format": "int32"
    },
    "rolled": {
      "type": "boolean",
      "default": false
    },
    "turn": {
      "type": "boolean",
      "default": false
    },
    "jail": {
      "properties": {
        "inJail": {
          "type": "boolean",
          "default": false
        },
        "turns": {
          "maximum": 2147483647,
          "minimum": -2147483648,
          "type": "integer",
          "format": "int32",
          "default": 0
        },
        "getOutOfJailFreeCards": {
          "maximum": 2147483647,
          "minimum": -2147483648,
          "type": "integer",
          "format": "int32",
          "default": 0
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};