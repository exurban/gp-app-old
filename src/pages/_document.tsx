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
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" key="twcard" />
          <meta name="twitter:creator" content={"@gibbs_photog"} key="twhandle" />
          <meta
            name="twitter:image"
            content={
              "https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1043-1612553422228.webp"
            }
            key="twimage"
          />
          <meta
            property="twitter:url"
            content={`https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1043-1612553422228.webp`}
            key="twurl"
          />
          <meta name="twitter:title" content="Photo TITLE" key="twtitle" />
          <meta name="twitter:description" content="photo DESCRIPTION" key="twdesc" />

          {/* Open Graph */}
          <meta
            name="og:url"
            content={`https://www.gibbs-photography.com/image/${photo.sku}`}
            key="ogurl"
          />
          <meta
            name="og:image"
            content="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1048-1612554931186.webp"
            key="ogimage"
          />
          <meta name="og:site_name" content="Gibbs Photography" key="ogsitename" />
          <meta name="og:title" content="OG title" key="ogtitle" />
          <meta name="og:description" content="OG DESCRIPTION" key="ogdesc" />
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
