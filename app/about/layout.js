import '../App.scss';
import '../index.css';
import '../globals.css';

export const metadata = {
  title: 'Extracts | Антология отрывков философских текстов',
  description: 'С поиском и фильтрацией по авторам',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
