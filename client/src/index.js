// mock api
import "./_apis_";

// i18n
import "./locales/i18n";

// highlight
import "./utils/highlight";

// scroll bar
import "simplebar/src/simplebar.css";

// map
import "mapbox-gl/dist/mapbox-gl.css";

// lightbox
import "react-image-lightbox/style.css";

// slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// react data table component
import "react-data-table-component-extensions/dist/index.css";

// toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// lazy image
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";
import "lazysizes/plugins/object-fit/ls.object-fit";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

// material =>  to use Date and Time pickers from @mui/lab
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
// redux
import { store, persistor } from "./redux/store";
// contexts
import { SettingsProvider } from "./contexts/SettingsContext";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";
// components
import LoadingScreen from "./components/LoadingScreen";

import { AuthProvider } from "./contexts/JWTContext";

//
import App from "./App";
// ----------------------------------------------------------------------

ReactDOM.render(
    <HelmetProvider>
        <ReduxProvider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <SettingsProvider>
                        <CollapseDrawerProvider>
                            <BrowserRouter>
                                <AuthProvider>
                                    <ToastContainer
                                        position="top-center"
                                        autoClose={4000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                    />
                                    <App />
                                </AuthProvider>
                            </BrowserRouter>
                        </CollapseDrawerProvider>
                    </SettingsProvider>
                </LocalizationProvider>
            </PersistGate>
        </ReduxProvider>
    </HelmetProvider>,
    document.getElementById("root")
);
