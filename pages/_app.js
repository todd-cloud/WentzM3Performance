import Head from 'next/head';
import '../public/styles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>Wentz Designs M3 Division</title>
        <meta name="description" content="BMW M3 performance parts, gallery, and community meets by Wentz Designs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph (social sharing) */}
        <meta property="og:title" content="Wentz Designs M3 Division" />
        <meta property="og:description" content="BMW M3 performance parts, gallery, and community meets." />
        <meta property="og:image" content="/og-image.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wentzm3performance.vercel.app" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wentz Designs M3 Division" />
        <meta name="twitter:description" content="BMW M3 performance parts, gallery, and community meets." />
        <meta name="twitter:image" content="/og-image.svg" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
