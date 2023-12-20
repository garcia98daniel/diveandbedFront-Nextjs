import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react'
import {Provider} from 'react-redux'
import App from 'next/app'
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from '../../store';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
const { store, persistor } = configureStore();

import global_en from "../translations/en/global.json";
import global_es from "../translations/es/global.json";

i18next.init({
    interpolation: { escapeValue: false },
    lng: "es",
    resources: {
        en: {
            global: global_en
        },
        es: {
            global: global_es
        }
    }
});

class MyApp extends App {

    render() {
        const {Component, pageProps} = this.props

        return (
                <Provider store={store}>
                    <I18nextProvider i18n={i18next}>
                       <PersistGate persistor={persistor} loading={null}>
                        <Component {...pageProps} />
                       </PersistGate> 
                    </I18nextProvider>
                </Provider>
        )
    }
}

export default MyApp