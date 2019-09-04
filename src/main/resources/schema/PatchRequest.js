module.exports = {
  "required": [
    "op",
    "path",
    "value"
  ],
  "properties": {
    "op": {
      "type": "string",
      "enum": [
        "replace"
      ]
    },
    "path": {
      "type": "string"
    },
    "value": {
      "type": "object"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};