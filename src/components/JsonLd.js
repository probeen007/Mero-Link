export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // `<` escaped so user-supplied strings can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
