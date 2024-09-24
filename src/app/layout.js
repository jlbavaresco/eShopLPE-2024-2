import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from '@/componentes/Menu';

export const metadata = {
  title: "eShop com Next 14",
  description: "App com Next Fullstack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Menu/>
        {children}
      </body>
    </html>
  );
}
