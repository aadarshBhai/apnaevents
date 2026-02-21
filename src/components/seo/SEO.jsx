import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author
}) => {
  const siteTitle = 'ApnaEvents - India\'s Premier Competition Platform';
  const siteDescription = 'The official gateway for students to discover verified competitions, build academic portfolios, and earn national recognition.';
  const siteUrl = 'https://apnaevents.com'; // Replace with actual domain
  const defaultImage = `${siteUrl}/images/og-image.jpg`; // Ensure this image exists

  const fullTitle = title ? `${title} | ApnaEvents` : siteTitle;
  const metaDescription = description || siteDescription;
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
  const metaUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: siteUrl,
      name: 'ApnaEvents',
      alternateName: 'India\'s Premier Merit Pipeline',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/discover?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: siteUrl,
      name: 'ApnaEvents',
      logo: `${siteUrl}/logo.png`,
      sameAs: [
        'https://www.facebook.com/apnaevents',
        'https://twitter.com/apnaevents',
        'https://www.linkedin.com/company/apnaevents',
        'https://www.instagram.com/apnaevents'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-98765-43210',
        contactType: 'Customer Support',
        email: 'aadarshgolucky@gmail.com'
      }
    }
  ];

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="ApnaEvents" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
};

export default SEO;
