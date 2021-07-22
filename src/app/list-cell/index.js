import { CellContainer } from "./style";
import { useSelector } from "react-redux";
import { selectActiveCell } from "../../store/slice";

const Cell = props => {
  const { x, y } = props;

  const activeCell = useSelector(selectActiveCell(x + "," + y));

  return <CellContainer active={activeCell ? true : false} />;
};

const ListCell = () => {
  const xs = Array.from({ length: 30 }, (_, i) => i + 1);

  const ys = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="list-cell">
      {ys.map(itemY => {
        return (
          <div key={itemY}>
            {xs.map(itemX => {
              return <Cell key={itemX + "," + itemY} x={itemX} y={itemY} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ListCell;
