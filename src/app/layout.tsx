import "./globals.css";
import BottomNav from "./components/BottomNav";

export const metadata = {
  title: "Tilmen",
  description: "Изучай казахский язык",
  icons: {
    icon: "/kazakhstan-svgrepo-com.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="pb-16 sm:pb-0">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
