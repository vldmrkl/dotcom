import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import { marked } from 'marked';

const contentPath = path.join(__dirname, '../../../', 'content');

async function parseMarkdown(filename) {
  const file = await fs.readFile(path.join(contentPath, filename));
  const { attributes, body } = parseFrontMatter(file.toString());
  const html = marked(body);

  return {
    slug: filename.split('.md')[0],
    html,
    title: attributes.title,
    description: attributes.description,
    date: new Date(attributes.date).toLocaleDateString(),
  };
}

export async function getPosts() {
  const dir = await fs.readdir(contentPath);
  const posts = await Promise.all(
    dir.map(async (filename) => await parseMarkdown(filename)),
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPost(slug) {
  return await parseMarkdown(slug.concat('.md'));
}
