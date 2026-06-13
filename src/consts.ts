export const SITE_TITLE = "usephjo's blog";
export const SITE_DESCRIPTION = "个人博客 — 笔记、片段与写作";
export const AUTHOR = "usephjo";
export const AUTHOR_BIO = "写点东西，记录思考。";
export const SITE_URL = "https://usephjo.github.io";

export const CATEGORIES: { slug: string; label: string; emoji: string }[] = [
  { slug: "tech", label: "技术", emoji: "💻" },
  { slug: "life", label: "生活", emoji: "🌿" },
  { slug: "reading", label: "阅读", emoji: "📚" },
  { slug: "thinking", label: "思考", emoji: "💭" },
];

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/auth", label: "登录" },
];

export const SOCIAL_LINKS: { href: string; label: string }[] = [
  { href: "/rss.xml", label: "RSS" },
];
