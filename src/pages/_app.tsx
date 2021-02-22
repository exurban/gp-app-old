import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { Provider as AuthProvider } from "next-auth/client";
import { Provider as BumbagProvider, ToastManager } from "bumbag";
import { useEffect } from "react";
import * as gtag from "../utils/gtag";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import Layout from "../components/Layout";
import CarouselLayout from "../components/CarouselLayout";
import gpTheme from "../gp-theme";

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
      <ApolloProvider client={apolloClient}>
        <AuthProvider session={pageProps.session}>
          <BumbagProvider isSSR colorMode="dark" theme={gpTheme}>
            {router.pathname.startsWith(`/carousel/`) ? (
              <CarouselLayout>
                <Component {...pageProps} />
              </CarouselLayout>
            ) : (
              <Layout>
                <Head>
                  <link
                    rel="preload"
                    href="/fonts/raleway-v19-latin-700.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                  />
                  <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
                  <link href="/static/favicons/site.webmanifest" rel="manifest" />
                  <link
                    href="/static/favicons/apple-touch-icon.png"
                    rel="apple-touch-icon"
                    sizes="180x180"
                  />
                  <link
                    href="/static/favicons/favicon-32x32.png"
                    rel="icon"
                    sizes="32x32"
                    type="image/png"
                  />
                  <link
                    href="/static/favicons/favicon-16x16.png"
                    rel="icon"
                    sizes="16x16"
                    type="image/png"
                  />
                </Head>
                <DefaultSeo {...SEO} />
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
