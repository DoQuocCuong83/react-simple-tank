export const getFullTank = (direction, center) => {
  if (direction === "top") {
    return {
      direction,
      center,
      gun: { x: center.x, y: center.y - 1 },
      body: {
        [center.x + "," + center.y]: true,
        [center.x + "," + (center.y - 1)]: true,
        [center.x - 1 + "," + center.y]: true,
        [center.x - 1 + "," + (center.y + 1)]: true,
        [center.x + 1 + "," + center.y]: true,
        [center.x + 1 + "," + (center.y + 1)]: true
      }
    };
  }
  if (direction === "bottom") {
    return {
      direction,
      center,
      gun: { x: center.x, y: center.y + 1 },
      body: {
        [center.x + "," + center.y]: true,
        [center.x + "," + (center.y + 1)]: true,
        [center.x - 1 + "," + center.y]: true,
        [center.x - 1 + "," + (center.y - 1)]: true,
        [center.x + 1 + "," + center.y]: true,
        [center.x + 1 + "," + (center.y - 1)]: true
      }
    };
  }
  if (direction === "right") {
    return {
      direction,
      center,
      gun: { x: center.x + 1, y: center.y },
      body: {
        [center.x + "," + center.y]: true,
        [center.x + 1 + "," + center.y]: true,
        [center.x + "," + (center.y - 1)]: true,
        [center.x - 1 + "," + (center.y - 1)]: true,
        [center.x + "," + (center.y + 1)]: true,
        [center.x - 1 + "," + (center.y + 1)]: true
      }
    };
  }
  if (direction === "left") {
    return {
      direction,
      center,
      gun: { x: center.x - 1, y: center.y },
      body: {
        [center.x + "," + center.y]: true,
        [center.x - 1 + "," + center.y]: true,
        [center.x + "," + (center.y - 1)]: true,
        [center.x + 1 + "," + (center.y - 1)]: true,
        [center.x + "," + (center.y + 1)]: true,
        [center.x + 1 + "," + (center.y + 1)]: true
      }
    };
  }
};
