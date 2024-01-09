
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import AppRoutes from './Routes';
import { Provider } from 'react-redux';
import { persistor, store } from './Store/Store';
import { PersistGate } from 'redux-persist/integration/react';
let root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <Provider store={store} >
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
