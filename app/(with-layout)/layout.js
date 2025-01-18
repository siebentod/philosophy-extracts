import App from './components/App';
import '../App.scss';
import '../index.css';
import '../globals.css';
import Head from 'next/head';

export const metadata = {
  title: 'Extracts | Антология отрывков философских текстов',
  description: 'С поиском и фильтрацией по авторам',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <Head>
        <meta
          name="google-site-verification"
          content="yW0UNzfYP4wvVQU3xSXJO6QesaQccZ8FrrLVKo7xvtg"
        />
      </Head>
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
