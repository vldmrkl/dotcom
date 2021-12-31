import { Link, useLoaderData } from 'remix';
import Header from '~/pages/common/Header';
import { getPosts } from '~/blog';

export const loader = () => {
  return getPosts();
};

export const meta = () => {
  return {
    title: "Volodymyr Klymenko's Blog",
    description: 'The blog of Volodymyr Klymenko about software development.',
  };
};

export default function BlogRoute() {
  const posts = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto px-8 sm:px-6 md:px-4">
      <h1 className="text-4xl  font-bold font-mono">Blog</h1>
      <h2 className="font-mono text-xl text-zinc-500 py-4">
        I mostly write about web development, iOS/macOS dev and open source.
      </h2>
      <ul className="my-12">
        {posts.map((post) => (
          <li key={post.slug} className="my-4">
            <Link to={`/blog/${post.slug}`}>
              <h1 className="font-bold text-2xl">{post.title}</h1>
              <p className="font-light text-sm text-zinc-500">{post.date}</p>
              {post.description && (
                <h2 className="font-light text-lg text-zinc-500">
                  {post.description}
                </h2>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
