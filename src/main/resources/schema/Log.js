module.exports = {
  "required": [
    "action",
    "message",
    "player"
  ],
  "properties": {
    "player": {
      "type": "integer",
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "action": {
      "type": "string",
      "enum": [
        "chance",
        "communityChest",
        "roll",
        "trade",
        "buyTitle",
        "buyHouse",
        "sellHouse",
        "buyHotel",
        "sellHotel",
        "mortgageTitle",
        "jail",
        "go"
      ]
    },
    "message": {
      "type": "string"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};