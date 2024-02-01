import { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { MetronicI18nProvider } from "./i18n";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ability from "./configs/acl/ability";
import { ToastContainer } from "react-toastify";
import { AbilityContext } from "./utility/context/Can";
import { ThemeContext } from "./utility/context/ThemeColors";
import { IntlProviderWrapper } from "./utility/context/Internationalization";
import { BrowserRouter as AppRouter } from "react-router-dom";
import Spinner from "./utility/components/spinner/fallback-spinner";
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../src/@core/scss/react/libs/toastify/toastify.scss";
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";

const LazyApp = lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            <IntlProviderWrapper>
              <MetronicI18nProvider>
                <AppRouter basename={process.env.REACT_APP_BASENAME}>
                  <LazyApp />
                </AppRouter>
              </MetronicI18nProvider>
              <ToastContainer newestOnTop />
            </IntlProviderWrapper>
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
