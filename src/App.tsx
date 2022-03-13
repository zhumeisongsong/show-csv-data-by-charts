import { FC } from "react";
import { Provider } from "react-redux";
import { useRoutes } from "react-router-dom";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";

import { store } from "./models/store";
import routes from "./routes/";
import "./App.css";

const persistor = getPersistor();

const App: FC = () => {
  let element = useRoutes(routes);

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>{element}</Provider>
    </PersistGate>
  );
};

export default App;
