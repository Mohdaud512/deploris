import { safeJsonLd } from '@/lib/schema';

/**
 * Renders one or more JSON-LD blobs. Uses dangerouslySetInnerHTML by necessity
 * (JSON-LD lives in a <script type="application/ld+json"> tag), but the payload
 * is JSON.stringify'd + <>& escaped by `safeJsonLd`, and the input is always
 * server-controlled (schema builders in lib/schema.ts).
 */
export function SchemaJsonLd({ data }: { data: object | object[] }) {
  const blobs = Array.isArray(data) ? data : [data];
  return (
    <>
      {blobs.map((blob, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: safeJsonLd(blob) }}
        />
      ))}
    </>
  );
}
