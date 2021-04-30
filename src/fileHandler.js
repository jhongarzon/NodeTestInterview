const fs = require("fs");
const ShipMovementHandler = require("./shipMovementHandler");
var shipMovementHandler = new ShipMovementHandler();
class FileHandler {
  readFile(fileName) {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // var dataArray = ["F10", "N3", "F7", "R90", "F11"];
        var dataArray = data.split("\n");
        // console.log();
        const finalCoordinates = shipMovementHandler.processMovements(
          dataArray
        );
        console.log(
          `The final coordinates are x: ${finalCoordinates.x} y: ${finalCoordinates.y}`
        );
        console.log(
          `The final distance is: ${
            Math.abs(finalCoordinates.x) + Math.abs(finalCoordinates.y)
          }`
        );
      }
    });
  }
}

module.exports = FileHandler;
