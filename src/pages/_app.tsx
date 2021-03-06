import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { Provider as AuthProvider } from "next-auth/client";
import { Provider as BumbagProvider, ToastManager } from "bumbag";
import { useEffect } from "react";
import * as gtag from "../utils/gtag";

import Layout from "../components/Layout";
import CarouselLayout from "../components/CarouselLayout";
import gpTheme from "../gp-theme";
import SEO from "../../next-seo.config";
import { DefaultSeo } from "next-seo";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const apolloClient = useApollo(pageProps);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <ApolloProvider client={apolloClient}>
        <AuthProvider session={pageProps.session}>
          <BumbagProvider isSSR colorMode="dark" theme={gpTheme}>
            {router.pathname.startsWith(`/carousel/`) ? (
              <CarouselLayout>
                <Component {...pageProps} />
              </CarouselLayout>
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}

            <ToastManager />
          </BumbagProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
