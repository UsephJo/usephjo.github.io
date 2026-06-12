import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "../consts";

export async function GET() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const notes = await getCollection("notes", ({ data }) => !data.draft);

  const allItems = [...posts, ...notes].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_URL,
    items: allItems.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.id.replace(/\.md$/, "")}`,
      categories: [...(item.data.categories ?? []), ...(item.data.tags ?? [])],
    })),
    customData: `<language>zh-CN</language>`,
  });
}
