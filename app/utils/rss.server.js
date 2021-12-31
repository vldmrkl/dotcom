import { getPosts } from '~/blog';

function escapeCdata(s) {
  return s.replace(/]]>/g, ']]]]><![CDATA[>');
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function buildRssString(reqHeaders) {
  const posts = await getPosts();
  const host = reqHeaders.get('X-Forwarded-Host') ?? reqHeaders.get('host');
  if (!host) {
    throw new Error('Could not determine domain URL.');
  }
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;
  const blogUrl = `${domain}/blog`;

  const rssString = `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>Volodymyr Klymenko's Blog</title>
        <link>${blogUrl}</link>
        <description>The blog of Volodymyr Klymenko about software development.</description>
        <language>en-us</language>
        <generator>vldmrkl.com</generator>
        <ttl>40</ttl>
        ${posts
          .map((post) =>
            `
            <item>
              <title><![CDATA[${escapeCdata(post.title)}]]></title>
              <description><![CDATA[${escapeHtml(
                post.description,
              )}]]></description>
              <pubDate>${new Date(post.date).toUTCString()}</pubDate>
              <link>${blogUrl}/${post.slug}</link>
              <guid>${blogUrl}/${post.slug}</guid>
              <content:encoded>${escapeHtml(post.html)}</content:encoded>
            </item>
          `.trim(),
          )
          .join('\n')}
      </channel>
    </rss>
  `.trim();

  return rssString;
}
