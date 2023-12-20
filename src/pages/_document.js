import Document, { Html, Head, Main, NextScript } from "next/document";

class MainDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  render() {
    return (
        <>
      <Html>
        <Head>
          <link rel="shortcut icon" href="/images/tapIcon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"/>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          {/*Below we add the modal wrapper*/}
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
        </>
    );
  }
}

export default MainDocument;