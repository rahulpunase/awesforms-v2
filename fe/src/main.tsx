import "./global.css";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App.tsx";
import { APP_NAMES } from "./lib/configs/router-config/constants.ts";
import store from "./store/store.ts";
import LazyLoadFormView from "./views/Form/LazyLoad.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path={APP_NAMES.Form}>
          <Route path=":formId" element={<LazyLoadFormView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
