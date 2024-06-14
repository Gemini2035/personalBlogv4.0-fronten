import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { GlobalConfigProvider } from "./hooks";
import { ROUTES } from "./router";

function App() {
  return (
    <GlobalConfigProvider>
      <Layout>
        <Routes>
          {ROUTES.map(({ id, element, path }) => (
            <Route {...{ id, element, path }} />
          ))}
        </Routes>
      </Layout>
    </GlobalConfigProvider>
  );
}

export default App;
