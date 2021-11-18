import CustomerPage from "./CustomerPage";
import ProviderPage from "./ProviderPage";

function Home({ loginSucess, userType }) {
  console.log(loginSucess);
  console.log(userType);

  const pageRender = () => {
    if (loginSucess) {
      if (userType === "customer") {
        return <CustomerPage />;
      } else {
        return <ProviderPage />;
      }
    }
    return <h1>Home Page</h1>;
  };

  return pageRender();
}

export default Home;
