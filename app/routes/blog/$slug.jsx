import { useLoaderData } from 'remix';
import { getPost } from '~/blog';
import { SITE_BASE_URL } from '~/utils/constants';

export const loader = async ({ params }) => {
  return getPost(params.slug);
};

export const meta = ({ data, location, params }) => {
  if (!data) {
    return {
      title: "Volodymyr Klymenko's Blog",
      description: 'The blog of Volodymyr Klymenko about software development.',
    };
  }

  return {
    title: data.title,
    description: data.description
      ? data.description
      : `Blog post about ${data.title} by Volodymyr Klymenko`,
    'twitter:card': 'summary_large_image',
    'twitter:title': data.title,
    'twitter:text:title': data.title,
    'og:title': data.title,
    'og:url': SITE_BASE_URL + location.pathname,
    'og:type': 'website',
    'og:description': data.description,
    'og:image': SITE_BASE_URL + '/img/site-share.png',
  };
};

export default function PostSlug() {
  const post = useLoaderData();

  return (
    <article className="max-w-3xl mx-auto py-10 px-8 sm:px-6 md:px-4">
      <h1 className="text-6xl font-bold text-gray-900">{post.title}</h1>
      <p className="font-light text-lg text-zinc-500 py-2">{post.date}</p>
      <div
        className="mt-10 prose prose-quoteless"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
