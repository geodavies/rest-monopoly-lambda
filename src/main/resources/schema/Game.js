module.exports = {
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "players": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Player"
      }
    },
    "titles": {
      "properties": {
        "properties": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/Property"
          }
        },
        "utilities": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/Utility"
          }
        },
        "stations": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/Station"
          }
        }
      }
    },
    "logs": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/Log"
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};