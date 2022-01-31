---
title: Site Rewrite
description: How I rewrote my website and blog into Remix and Tailwind CSS.
date: 2022-01-30
---

Last month, I developed and released the second version of my personal website. Besides UI/UX enhancements, bug fixes, and the migration of my blog from a separate web application into here, the new version also brings a major update to the tech stack. It adds React, Remix and Tailwind.

In this post, I would like to share my experience of building this website with Remix and Tailwind as well as some challenges that I had and overcame. But first, let me give you a few details on the previous version and why I decided to change it.

## Background

When I designed the first version of my site, it was a static single-page site, so I built it with HTML, Bootstrap, some custom CSS and a little bit of jQuery. Although I had plans to add more stuff to the site, I didn't want to overengineer it and add a library like React immediately. I decided to do so once I have a clear vision of what I want to see in the next version, and it just makes sense to have it.

> If you want to see the first version, you can check it out at [v1.vldmrkl.com](https://v1.vldmrkl.com/)!

Also, I had created a React app for my blog a few months before I made my personal website. The blog was built with GatsbyJS, and I used one of their blog starter templates. I liked the UI of that template the most, so I chose it immediately.

I slightly tweaked the UI and removed the elements I didn't want to have. Then, I just added my blog content there, and it was ready for deployment. The performance of the app was on point, which is important was this kind of websites. However, I wasn't fully satisfied with it.

I remember one day I wanted to update something the blog, and I didn't have the repo on my laptop. I cloned the repository and tried to install dependencies and run the app, but I ran into a few errors that were caused by some dependencies that were upgraded but also broke the app. I spent a couple of hours fixing them and make it run again. It wasn't very fun. The blog starter wasn't patched with the fixes to these issues. Moreover, it was deprecated by Gatsby.

In addition to that, the app was fully styled with styled-jsx library, which I haven't tried prior to this project and, to be honest, **I personally** didn't like it that much. These factors made the maintenance of this app less enjoyable, and if I had any ideas for new features, I would just delay them.

> The first version of the blog is currently available at [blog.vldmrkl.com](https://blog.vldmrkl.com/).

My personal website had a link to the blog which would take the user to a separate site where the blog was hosted. I think this UX wasn't perfect, so I've always had an idea of merging my website and the blog into web application.

There are some technologies that became popular lately, but I hadn't had a chance to use yet. In particular, [Tailwind](https://tailwindcss.com/) and [Remix](https://remix.run/docs/en/v1). The later [has become open-source](https://remix.run/blog/seed-funding-for-remix) recently. I researched both of them more carefully, and they seemed like a good fit for my site rebuilding project.

## Preparation

Before I started the development, I spent some time learning Remix and Tailwind.

Tailwind was pretty straightforward, and it isn't a steep learning curve if you know CSS. During the development, I used it mostly for the reference as I was memorizing the class names and all available styling options.

Remix documentation has two nice tutorials: "Developer Blog" and "Jokes App". I followed the first tutorial entirely and skimmed through the latter. These tutorials are a great introduction to the main concepts and APIs of Remix. The "Developer Blog" was particularly useful for me as I was going to implement the blog.

## The Process

This project consisted of two major parts:

1. Rewriting the current website into Remix and Tailwind.
2. Migrating the blog from GatsbyJS to the updated Remix/Tailwind website.

### Project Set Up

First of all, I had to set up the web application. I created a new Remix app using the **npx create-remix@latest** command with the following parameters:

```sh
Deployment Target: Netlify;
TypeScript or JavaScript: JavaScript;
```

> I had already been using Netlify for site deployments, so I decided to stick with it.

Adding Tailwind to a Remix application is quite simple and [documented on Remix website](https://remix.run/docs/en/v1/guides/styling#tailwind).

**Note**: if you also choose Netlify as your deployment target and then, copy & paste the package scripts from Remix, the app will break. To make it work again, replace **remix dev** with **netlify dev** in the **dev** command. Don't repeat my mistake 😄

That's it. The app runs and compiles CSS based on Tailwind classes successfully.

### Rewriting the Current Website into Remix and Tailwind

I started with breaking down my website into UI components. Since I had already had HTML code of my previous design, I just had to split the code into components, refactor it into JSX and then replace the existing CSS classes with Tailwind classes. This process was fairly quick. I attribute this fact to Tailwind because it has all classes that I needed for my design, so I didn't have to write any custom CSS.

Also, Tailwind has a rich design system which enabled me to experiment with my UI fast and make a few enhancements, while I was styling my components.

### Migrating the Blog from GatsbyJS to the New Remix/Tailwind website

In Remix, there are two ways of adding routes to your application:

1. File-based routing
2. Routing manually defined in **remix.config.js**

I selected the first option, which is the more common way in Remix.

I needed to add three new routes to the site:

- **/blog** – contains a list of my blog posts
- **/blog/:blogId** - contains a blog post with specified identifier
- **/blog/rss.xml** - serves my blog's RSS feed

To achieve this routing, I added the following files to **/routes** directory:

```
 📂 blog
 ┣ 📜 $slug.jsx
 ┣ 📜 index.jsx
 ┗ 📜 rss[.]xml.jsx
```

After the routing was set up, I added the markdown parsing logic and helper functions for retrieving blog posts:

```js
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
```

Finally, I built the UI of the blog and used the functions from the code above.

Tailwind has an awesome plugin **@tailwindcss/typography** for styling HTML rendered from Markdown. After installing it and adding it to the tailwind.config.js, you can just add `prose` class to the element that wraps your markdown content, and the magic will happen.

### Challenges

#### Remix Errors

Remix is still a young framework, and it's been open sourced only recently. It's an amazing technology with an adorable philosophy, but there are still some things that can be improved. For example, I had one issue when I was implementing RSS feed endpoint. This code was supposed to be server-side, so I had this logic implemented inside the **loader** function, which is a special Remix function that's called on server. However, the app was crashing when I accessed the blog with this error:

> TypeError: Cannot read properties of undefined (reading 'root')

The error message wasn't helpful, and it was misleading at the same time. I couldn't find much on Stack Overflow and GitHub for this issue. But before opening an issue on GitHub, I decided to try my luck at Twitter/Discord because I knew that Remix community is quite active on these platforms. Luckily, I was able to find a solution by searching for this error message on Remix's Discord, and Ryan Florence (one of Remix co-founders) replied to someone who had a similar problem:
<img src="https://i.imgur.com/vgwQItd.png" />

Although it wasn't exactly my case, moving the code for building RSS feed string to a **.server.js** file resolved my problem! Later, I found that Remix compiler may not recognize the code that should only run on the server in [Remix docs](https://remix.run/docs/en/v1/guides/constraints#no-module-side-effects).

#### Problems During Netlify Deployment

After I finished the development, the only remaining task was to deploy the application to the web. As you can guess from the heading, I ran into an error during this process. When Netlify tried to build the app, it returned a dependencies installation error:

> A Netlify Function failed to require one of its dependencies.

> Please make sure it is present in the site's top-level "package.json".

> In file "/opt/build/repo/netlify/functions/server/index.js"

> Cannot find module 'fs/package.json'

According to the rest of Netlify's error log, it was apparently coming from Netlify's zip-it-and-ship-it package. I even found [the issue in their repository](https://github.com/netlify/zip-it-and-ship-it/issues/743), which they closed as resolved 🤔

I used the suggested solution which was changing **node_bundler** to **esbuild** in **netlify.toml** . My final configuration looked like this:

```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "public"

[functions]
  node_bundler = "esbuild"
  included_files = ["content/**"]

[dev]
  command = "remix watch"
  port = 3000

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200

[[headers]]
  for = "/build/*"
  [headers.values]
    "Cache-Control" = "public, max-age=31536000, s-maxage=31536000"
```

After that, deployments worked smoothly.

Also, I just want to mention that Netlify has a pretty good free tier for public Git repositories. I was able to set up live previews for PRs and automated builds for my dev and master branches **for free**!

## Final Thoughts

My main goal for this project was to get a taste of Remix and Tailwind, and I accomplished it. I absolutely liked both technologies, and I will definitely keep exploring them.

Now that I successfully migrated to this new stack, I am looking forward to adding new features. Also, I won't be hesitant about making changes to my blog anymore 😄

The code for this project is available at [https://github.com/vldmrkl/dotcom](https://github.com/vldmrkl/dotcom)
