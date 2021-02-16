import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { GA_TRACKING_ID } from "../utils/gtag";
import { extractCritical } from "bumbag-server";
import { InitializeColorMode } from "bumbag";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
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
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Landscape and nature photography from photographers Boyd and Scott Gibbs."
          />

          <meta property="og:url" content="https://gibbs-photography.com" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Welcome" />
          <meta property="og:description" content="to Gibbs Photography" />
          <meta
            property="og:image"
            content="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/photo_1169-1612571849332.webp"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="gibbs-photography.com" />
          <meta property="twitter:url" content="https://gibbs-photography.com" />
          <meta name="twitter:title" content="Welcome" />
          <meta name="twitter:description" content="to Gibbs Photography" />
          <meta
            name="twitter:image"
            content="https://configcdkstack-gpbucketc7c11d3d-qtgzc43jqi2c.s3.us-east-2.amazonaws.com/test-preview.jpg"
          />

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
          <link href="/fonts/style.css" rel="stylesheet" />
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
