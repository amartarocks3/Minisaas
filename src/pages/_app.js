import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Navbar from '@/components/Navbar';
import '../app/globals.css';

export default function App({ Component, pageProps }) {
  // Pages that don't need navbar (login, signup)
  const noNavbarPages = ['/login', '/signup'];
  const showNavbar = !noNavbarPages.includes(Component.displayName);

  return (
    <Provider store={store}>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
    </Provider>
  );
}
