
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import AppRoutes from './Routes';
import { Provider } from 'react-redux';
import { persistor, store } from './Store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <Provider store={store} >
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <AppRoutes />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

            </BrowserRouter>
        </PersistGate>
    </Provider>
);
