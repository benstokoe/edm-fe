import Layout from "@/components/Layout/Layout";
import AuthProvider from "@/contexts/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AuthProvider>
);

export default App;
