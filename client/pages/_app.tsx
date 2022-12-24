import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { store } from '../store';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
