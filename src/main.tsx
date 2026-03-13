import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";
import Layout from "./layout.tsx";

render(
  <Layout>
    <App />
  </Layout>,
  document.getElementById("app")!,
);
