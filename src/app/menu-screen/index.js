import { selectWinner, selectStatus } from "../../store/slice";
import { useSelector } from "react-redux";
import { MenuScreenContainer } from "./style";

const MenuScreen = () => {
  const winner = useSelector(selectWinner);
  const status = useSelector(selectStatus);

  return (
    <>
      {status === "menu" && (
        <MenuScreenContainer>
          <div className="title">Press y to start</div>
          {winner && <div className="result">{winner} Win</div>}
        </MenuScreenContainer>
      )}
    </>
  );
};

export default MenuScreen;
