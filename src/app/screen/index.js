import { ScreenContainer } from "./style";

const Screen = props => {
  return (
    <ScreenContainer>
      <div className="screen">{props.children}</div>
    </ScreenContainer>
  );
};

export default Screen;
