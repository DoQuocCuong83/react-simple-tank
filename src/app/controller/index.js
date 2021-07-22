import {
  setStatusInGame,
  setTank1Travel,
  setTank2Travel,
  setNewBullet,
  setBulletTravel,
  selectIsHaveBullet
} from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const Controller = () => {
  const dispatch = useDispatch();

  const isHaveBullet = useSelector(selectIsHaveBullet);

  const intervalValue = useRef();
  const waitFireTank1 = useRef(true);
  const waitFireTank2 = useRef(true);

  useEffect(() => {
    window.addEventListener("keyup", handleTank1Controll);
    document.addEventListener("keyup", handleTank2Controll);
    document.addEventListener("keyup", handleTank1Fire);
    document.addEventListener("keyup", handleTank2Fire);
    return () => {
      document.removeEventListener("keyup", handleTank1Controll);
      document.removeEventListener("keyup", handleTank2Controll);
      document.removeEventListener("keyup", handleTank1Fire);
      document.removeEventListener("keyup", handleTank2Fire);
    };
  }, []);

  const handleTank1Controll = e => {
    if (e.key === "y") {
      dispatch(setStatusInGame());
    }

    if (e.key === "w") {
      dispatch(setTank1Travel("top"));
    }
    if (e.key === "a") {
      dispatch(setTank1Travel("left"));
    }
    if (e.key === "s") {
      dispatch(setTank1Travel("bottom"));
    }
    if (e.key === "d") {
      dispatch(setTank1Travel("right"));
    }
  };

  const handleTank2Controll = e => {
    if (e.key === "i") {
      dispatch(setTank2Travel("top"));
    }
    if (e.key === "j") {
      dispatch(setTank2Travel("left"));
    }
    if (e.key === "k") {
      dispatch(setTank2Travel("bottom"));
    }
    if (e.key === "l") {
      dispatch(setTank2Travel("right"));
    }
  };

  const handleTank1Fire = e => {
    if (e.key === "g" && waitFireTank1.current) {
      dispatch(setNewBullet("tank1"));
      waitFireTank1.current = false;
      setTimeout(() => (waitFireTank1.current = true), 800);
    }
  };

  const handleTank2Fire = e => {
    if (e.key === "'" && waitFireTank2.current) {
      dispatch(setNewBullet("tank2"));
      waitFireTank2.current = false;
      setTimeout(() => (waitFireTank2.current = true), 800);
    }
  };

  useEffect(() => {
    if (isHaveBullet) {
      intervalValue.current = setInterval(() => {
        dispatch(setBulletTravel());
      }, 80);
    } else {
      clearInterval(intervalValue.current);
    }
  }, [isHaveBullet, dispatch]);

  return <></>;
};

export default Controller;
