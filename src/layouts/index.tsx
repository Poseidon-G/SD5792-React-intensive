import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

export const Layout = ({ children, isLoggedIn }: LayoutProps) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
