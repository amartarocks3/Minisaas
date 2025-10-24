import { ReduxProvider } from '@/redux/Provider';

export const metadata = {
  title: 'My Next.js App with Redux',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
