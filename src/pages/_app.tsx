import { AppProps } from "next/app";
// import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { Provider as AuthProvider } from "next-auth/client";
import { Provider as BumbagProvider, ToastManager } from "bumbag";
// import { useEffect } from "react";
// import * as gtag from "../utils/gtag";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import AdminLayout from "../components/AdminLayout";
import Layout from "../components/Layout";
import gpTheme from "../gp-theme";

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  const apolloClient = useApollo(pageProps);

  // const rtr = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url: URL) => {
  //     gtag.pageview(url);
  //   };
  //   rtr.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     rtr.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [rtr.events]);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider session={pageProps.session}>
        <BumbagProvider isSSR colorMode="dark" theme={gpTheme}>
          {router.pathname.startsWith("/admin") ? (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          ) : (
            <Layout>
              <DefaultSeo {...SEO} />
              <Component {...pageProps} />
            </Layout>
          )}
          <ToastManager />
        </BumbagProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
