const assert = require("assert");
const ShipMovementHandler = require("../src/shipMovementHandler");

const shipMovementHandler = new ShipMovementHandler();
describe("Validate rotation values", () => {
  it("should be a valid rotation value", () => {
    assert.strictEqual(shipMovementHandler.isValidRotationValue(180), true);
    assert.strictEqual(shipMovementHandler.isValidRotationValue(90), true);
    assert.strictEqual(shipMovementHandler.isValidRotationValue(270), true);
    assert.strictEqual(shipMovementHandler.isValidRotationValue(540), true);
  });
  it("should be an invalid rotation value", () => {
    assert.strictEqual(shipMovementHandler.isValidRotationValue(190), false);
    assert.strictEqual(shipMovementHandler.isValidRotationValue(5), false);
  });
});

describe("Validate conversion between degress and directions ", () => {
  it("should be a valid conversion", () => {
    assert.strictEqual(shipMovementHandler.convertDegreesToDirection(180), "E");
    assert.strictEqual(shipMovementHandler.convertDegreesToDirection(0), "W");
    assert.strictEqual(shipMovementHandler.convertDegreesToDirection(90), "N");
    assert.strictEqual(shipMovementHandler.convertDegreesToDirection(-90), "S");
  });
  it("should be an invalid conversionn", () => {
    assert.strictEqual(shipMovementHandler.convertDegreesToDirection(100), "");
    assert.strictEqual(shipMovementHandler.convertDegreesToDirection(-10), "");
  });
});

describe("Validate conversion between directions and degress ", () => {
  it("should be a valid conversion", () => {
    assert.strictEqual(shipMovementHandler.convertDirectionToDegrees("S"), 270);
    assert.strictEqual(shipMovementHandler.convertDirectionToDegrees("W"), 0);
    assert.strictEqual(shipMovementHandler.convertDirectionToDegrees("N"), 90);
    assert.strictEqual(shipMovementHandler.convertDirectionToDegrees("E"), 180);
  });
  it("should be an invalid conversion", () => {
    assert.strictEqual(shipMovementHandler.convertDirectionToDegrees("A"), -1);
    assert.strictEqual(shipMovementHandler.convertDirectionToDegrees("BC"), -1);
  });
});

describe("Should get the final coordinates correctly", () => {
  it("should be a valid", () => {
    var dataArray = ["F10", "N3", "F7", "R90", "F11"];
    assert.deepEqual(shipMovementHandler.processMovements(dataArray), {
      x: 17,
      y: -8,
    });
  });
  it("should be a valid", () => {
    var dataArray = "F10";
    assert.deepEqual(shipMovementHandler.processMovements(dataArray), false);
  });
});
