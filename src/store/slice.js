import { createSlice } from "@reduxjs/toolkit";
import { getFullTank } from "../helper/getFullTank";

const initialState = {
  status: "menu",
  tank1: { center: { x: 2, y: 29 } },
  tank2: { center: { x: 29, y: 2 } },
  bullet: [],
  isHaveBullet: false,
  activeCell: {},
  winner: undefined
};

export const tankSlice = createSlice({
  name: "tank",
  initialState,
  reducers: {
    setStatusInGame(state) {
      if (state.status === "menu") {
        state.status = "in-game";
        state.winner = undefined;
        state.activeCell = {};
        state.isHaveBullet = false;
        state.bullet = [];
        const tank1 = getFullTank("top", { x: 2, y: 29 });
        state.tank1 = tank1;
        state.activeCell = { ...state.activeCell, ...tank1.body };
        const tank2 = getFullTank("bottom", { x: 29, y: 2 });
        state.tank2 = tank2;
        state.activeCell = { ...state.activeCell, ...tank2.body };
      }
    },
    setTank1Travel(state, action) {
      const x1 = state.tank1.center.x;
      const y1 = state.tank1.center.y;
      const x2 = state.tank2.center.x;
      const y2 = state.tank2.center.y;
      const direction = action.payload;
      let tank1;

      if (
        direction === "top" &&
        y1 > 2 &&
        Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - 1 - y2, 2)) > 2.8
      ) {
        tank1 = getFullTank("top", {
          x: x1,
          y: y1 - 1
        });
      } else if (
        direction === "bottom" &&
        y1 < 29 &&
        Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 + 1 - y2, 2)) > 2.8
      ) {
        tank1 = getFullTank("bottom", {
          x: x1,
          y: y1 + 1
        });
      } else if (
        direction === "left" &&
        x1 > 2 &&
        Math.sqrt(Math.pow(x1 - 1 - x2, 2) + Math.pow(y1 - y2, 2)) > 2.8
      ) {
        tank1 = getFullTank("left", {
          x: x1 - 1,
          y: y1
        });
      } else if (
        direction === "right" &&
        x1 < 29 &&
        Math.sqrt(Math.pow(x1 + 1 - x2, 2) + Math.pow(y1 - y2, 2)) > 2.8
      ) {
        tank1 = getFullTank("right", {
          x: x1 + 1,
          y: y1
        });
      }
      if (tank1) {
        for (let key in state.tank1.body) {
          delete state.activeCell[key];
        }
        state.tank1 = tank1;
        state.activeCell = { ...state.activeCell, ...tank1.body };
      }
    },
    setTank2Travel(state, action) {
      const x1 = state.tank1.center.x;
      const y1 = state.tank1.center.y;
      const x2 = state.tank2.center.x;
      const y2 = state.tank2.center.y;
      const direction = action.payload;
      let tank2;

      if (
        direction === "top" &&
        y2 > 2 &&
        Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - (y2 - 1), 2)) > 2.8
      ) {
        tank2 = getFullTank("top", {
          x: x2,
          y: y2 - 1
        });
      } else if (
        direction === "bottom" &&
        y2 < 29 &&
        Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - (y2 + 1), 2)) > 2.8
      ) {
        tank2 = getFullTank("bottom", {
          x: x2,
          y: y2 + 1
        });
      } else if (
        direction === "left" &&
        x2 > 2 &&
        Math.sqrt(Math.pow(x1 - (x2 - 1), 2) + Math.pow(y1 - y2, 2)) > 2.8
      ) {
        tank2 = getFullTank("left", {
          x: x2 - 1,
          y: y2
        });
      } else if (
        direction === "right" &&
        x2 < 29 &&
        Math.sqrt(Math.pow(x1 - (x2 + 1), 2) + Math.pow(y1 - y2, 2)) > 2.8
      ) {
        tank2 = getFullTank("right", {
          x: x2 + 1,
          y: y2
        });
      }
      if (tank2) {
        for (let key in state.tank2.body) {
          delete state.activeCell[key];
        }
        state.tank2 = tank2;
        state.activeCell = { ...state.activeCell, ...tank2.body };
      }
    },
    setNewBullet(state, action) {
      const tank = action.payload;
      const gunPosition = state[tank].gun;
      state.bullet.push({
        tank: tank,
        position: { x: gunPosition.x, y: gunPosition.y },
        direction: state[tank].direction
      });
      state.isHaveBullet = true;
    },
    setBulletTravel(state) {
      const activeCell = state.activeCell;
      const bullets = state.bullet;
      const gun = tank => state[tank].gun;
      const tank1Body = state.tank1.body;
      const tank2Body = state.tank2.body;

      bullets.forEach((item, index) => {
        if (item.direction === "top") {
          if (item.position.y > 1) {
            if (
              gun(item.tank).x !== item.position.x ||
              gun(item.tank).y !== item.position.y
            ) {
              delete activeCell[item.position.x + "," + item.position.y];
            }
            item.position.y -= 1;
            activeCell[item.position.x + "," + item.position.y] = true;
          } else {
            bullets.splice(index, 1);
            delete activeCell[item.position.x + "," + item.position.y];
            if (bullets.length === 0) state.isHaveBullet = false;
          }
        }
        if (item.direction === "bottom") {
          if (item.position.y < 30) {
            if (
              gun(item.tank).x !== item.position.x ||
              gun(item.tank).y !== item.position.y
            ) {
              delete activeCell[item.position.x + "," + item.position.y];
            }
            item.position.y += 1;
            activeCell[item.position.x + "," + item.position.y] = true;
          } else {
            bullets.splice(index, 1);
            delete activeCell[item.position.x + "," + item.position.y];
            if (bullets.length === 0) state.isHaveBullet = false;
          }
        }
        if (item.direction === "left") {
          if (item.position.x > 1) {
            if (
              gun(item.tank).x !== item.position.x ||
              gun(item.tank).y !== item.position.y
            ) {
              delete activeCell[item.position.x + "," + item.position.y];
            }
            item.position.x -= 1;
            activeCell[item.position.x + "," + item.position.y] = true;
          } else {
            bullets.splice(index, 1);
            delete activeCell[item.position.x + "," + item.position.y];
            if (bullets.length === 0) state.isHaveBullet = false;
          }
        }
        if (item.direction === "right") {
          if (item.position.x < 30) {
            if (
              gun(item.tank).x !== item.position.x ||
              gun(item.tank).y !== item.position.y
            ) {
              delete activeCell[item.position.x + "," + item.position.y];
            }
            item.position.x += 1;
            activeCell[item.position.x + "," + item.position.y] = true;
          } else {
            bullets.splice(index, 1);
            delete activeCell[item.position.x + "," + item.position.y];
            if (bullets.length === 0) state.isHaveBullet = false;
          }
        }
        for (let key in tank1Body) {
          if (
            key === item.position.x + "," + item.position.y &&
            item.tank === "tank2"
          ) {
            state.status = "menu";
            state.isHaveBullet = false;
            state.activeCell = {};
            state.winner = "Tank 2";
            break;
          }
        }
        for (let key in tank2Body) {
          if (
            key === item.position.x + "," + item.position.y &&
            item.tank === "tank1"
          ) {
            state.status = "menu";
            state.isHaveBullet = false;
            state.activeCell = {};
            state.winner = "Tank 1";
            break;
          }
        }
      });
    }
  }
});

export const {
  setStatusInGame,
  setTank1Travel,
  setTank2Travel,
  setNewBullet,
  setBulletTravel
} = tankSlice.actions;

export const selectActiveCell = positionCell => state =>
  state.activeCell[positionCell];
export const selectTank1Center = state => state.tank1.center;
export const selectTank2Center = state => state.tank2.center;
export const selectIsHaveBullet = state => state.isHaveBullet;
export const selectWinner = state => state.winner;
export const selectStatus = state => state.status;

export default tankSlice.reducer;
