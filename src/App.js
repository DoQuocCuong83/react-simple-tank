import Screen from "./app/screen";
import ListCell from "./app/list-cell";
import Controller from "./app/controller";
import MenuScreen from "./app/menu-screen";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Controller />
        <Screen>
          <ListCell />
        </Screen>
        <MenuScreen />
      </div>
    </Provider>
  );
};

export default App;
