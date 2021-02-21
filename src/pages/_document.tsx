import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { GA_TRACKING_ID } from "../utils/gtag";
import { extractCritical } from "bumbag-server";
import { InitializeColorMode } from "bumbag";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<{
    styles: JSX.Element;
    html: string;
    head?: (JSX.Element | null)[] | undefined;
  }> {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      )
    };
  }
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <title>"Gibbs Photography"</title>
          <meta name="description" content="" />

          <meta property="og:url" content="https://www.gibbs-photography.com/" key="ogurl" />
          <meta property="og:type" content="website" key="ogtype" />
          <meta property="og:title" content="" key="ogtitle" />
          <meta property="og:description" content="" key="ogdesc" />
          <meta property="og:image" content="" key="ogimage" />

          <meta name="twitter:creator" content={"@gibbs_photog"} key="twhandle" />
          <meta name="twitter:card" content="summary_large_image" key="twcard" />
          <meta property="twitter:domain" content="" />
          <meta property="twitter:url" content="http://localhost:3000/image/1042" />
          <meta name="twitter:title" content="" />
          <meta name="twitter:description" content="" />
          <meta name="twitter:image" content="" key="twimage" />
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
          <link color="#4a9885" href="/static/favicons/safari-pinned-tab.svg" rel="mask-icon" />
          <meta content="#ffffff" name="theme-color" />
          <meta content="#ffffff" name="msapplication-TileColor" />
          <meta content="/static/favicons/browserconfig.xml" name="msapplication-config" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `
            }}
          />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
