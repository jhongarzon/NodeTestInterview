/*
    Action N means to move north by the given value.
    Action S means to move south by the given value.
    Action E means to move east by the given value.
    Action W means to move west by the given value.
    Action L means to turn left the given number of degrees.
    Action R means to turn right the given number of degrees.
    Action F means to move forward by the given value in the direction the ship is currently facing.
*/

class ShipMovementHandler {
  #currentDirection = "E";
  #currentDirectionDegrees = 0;
  #currentCoordinatesXY = { x: 0, y: 0 };

  processMovements(movementArray) {
    if (!Array.isArray(movementArray)) return false;
    for (const key in movementArray) {
      if (Object.hasOwnProperty.call(movementArray, key)) {
        console.log("----------------------------------------");
        const movement = movementArray[key];
        const action = movement.substring(0, 1);
        const value = movement.substring(1, movement.length);
        this.move(action, parseInt(value));
        console.log("----------------------------------------");
      }
    }
    return this.#currentCoordinatesXY;
  }
  move(action, value) {
    console.log(
      `Processing... ${action}${value} Action: ${action} Value: ${value}`
    );
    console.log(
      `Current values: direction: ${this.#currentDirection} \n x: ${
        this.#currentCoordinatesXY.x
      } \n y: ${this.#currentCoordinatesXY.y}`
    );
    switch (action) {
      case "N":
        this.#currentCoordinatesXY.y += value;
        break;
      case "S":
        this.#currentCoordinatesXY.y -= value;
        break;
      case "E":
        this.#currentCoordinatesXY.x += value;
        break;
      case "W":
        this.#currentCoordinatesXY.x -= value;
        break;
      case "L":
        this.rotate(action, value);
        break;
      case "R":
        this.rotate(action, value);
        break;
      case "F":
        this.move(this.#currentDirection, value);
        break;
      default:
        console.log(`Not a valid movement Action: ${action} Value: ${value}`);
        break;
    }
    console.log(
      `New values: direction: ${this.#currentDirection} \n x: ${
        this.#currentCoordinatesXY.x
      } \n y: ${this.#currentCoordinatesXY.y}`
    );
  }

  rotate(direction, value) {
    if (!this.isValidRotationValue(value)) {
      console.log(`Not a valid rotation value ${direction} - ${value}`);
      return;
    }
    this.calculateNewDirection(direction, value);
  }
  calculateNewDirection(direction, value) {
    let newDirecctionDegrees = 0;
    if (direction === "L") {
      newDirecctionDegrees = (this.#currentDirectionDegrees + value) % 360;
    } else if (direction === "R") {
      newDirecctionDegrees = (this.#currentDirectionDegrees - value) % 360;
    }
    let newDirection = this.convertDegreesToDirection(newDirecctionDegrees);
    if (newDirection !== "") this.#currentDirection = newDirection;

    let standardDegrees = this.convertDirectionToDegrees(
      this.#currentDirection
    );
    if (standardDegrees !== -1) this.#currentDirectionDegrees = standardDegrees;
  }
  isValidRotationValue(value) {
    if (isNaN(value)) return false;
    return value % 90 == 0;
  }

  convertDegreesToDirection(degrees) {
    if (degrees == 0) {
      return "W";
    } else if (degrees == 90 || degrees === -270) {
      return "N";
    } else if (degrees == 180 || degrees === -180) {
      return "E";
    } else if (degrees == 270 || degrees === -90) {
      return "S";
    } else {
      return "";
    }
  }
  convertDirectionToDegrees(direction) {
    switch (direction) {
      case "N":
        return 90;
      case "S":
        return 270;
      case "E":
        return 180;
      case "W":
        return 0;
      default:
        return -1;
    }
  }
}
module.exports = ShipMovementHandler;
