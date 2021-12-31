import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import { marked } from 'marked';

const contentPath = path.join(__dirname, '..', 'content');

export async function getPosts() {
  const dir = await fs.readdir(contentPath);
  const posts = await Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(contentPath, filename));
      const { attributes } = parseFrontMatter(file.toString());

      return {
        slug: filename.split('.md')[0],
        title: attributes.title,
        description: attributes.description,
        date: new Date(attributes.date).toLocaleDateString(),
      };
    }),
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPost(slug) {
  const filepath = path.join(contentPath, slug + '.md');
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());

  const html = marked(body);
  return {
    slug,
    html,
    title: attributes.title,
    description: attributes.description,
    date: new Date(attributes.date).toLocaleDateString(),
  };
}
