import CustomerHomePage from "./CustomerHomePage";
import ProviderPage from "./ProviderPage";

function Home({ loginSuccess, userType }) {
  const pageRender = () => {
    if (loginSuccess) {
      if (userType === "customer") {
        return <CustomerHomePage />;
      } else {
        return <ProviderPage />;
      }
    }
    return <h1>Home Page</h1>;
  };

  return pageRender();
}

export default Home;
