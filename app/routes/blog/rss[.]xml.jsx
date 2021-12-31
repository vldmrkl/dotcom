import { buildRssString } from '~/utils/rss.server';

export const loader = async ({ request }) => {
  const rssString = await buildRssString(request.headers);

  return new Response(rssString, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(rssString)),
    },
  });
};
