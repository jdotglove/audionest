import '../styles/globals.css';

// import { Provider } from 'react-redux';
// import { useStore } from '../store';
import '../styles/scss/index.scss';

export default function CoffeeApp({ Component, pageProps }) {
  // const store = useStore(pageProps.initialReduxState);
  return (
   <Component props={pageProps} />
  );
}
