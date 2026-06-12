<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="utf-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/rss/channel">
    <html lang="zh-CN">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="robots" content="noindex"/>
      <title>RSS · <xsl:value-of select="title"/></title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: "PingFang SC", "Noto Sans SC", system-ui, sans-serif;
          background: #fafaf9; color: #1c1917;
          max-width: 640px; margin: 0 auto; padding: 3rem 1.5rem;
          font-size: 17px; line-height: 1.7;
        }
        @media (prefers-color-scheme: dark) {
          body { background: #1c1917; color: #fafaf9; }
          .item { border-color: #292524; }
          .item a { color: #60a5fa; }
          .item time { color: #a8a29e; }
          .copy { color: #a8a29e; }
          code { background: #292524; }
        }
        h1 { font-size: 1.4rem; margin-bottom: 0.5rem; }
        .subtitle { color: #78716c; font-size: 0.85rem; margin-bottom: 2rem; }
        .box {
          background: #f5f5f4; border-radius: 10px; padding: 1.2rem 1.5rem;
          margin-bottom: 2rem;
        }
        .box p { margin: 0.5rem 0; font-size: 0.92rem; }
        .box a { font-weight: 600; color: #0d6efd; }
        .box code {
          background: #e7e5e4; padding: 0.15em 0.4em; border-radius: 4px;
          font-size: 0.9em; word-break: break-all;
        }
        .feed-url {
          display: flex; gap: 0.5rem; align-items: center; margin-top: 0.8rem;
        }
        .feed-url input {
          flex: 1; padding: 0.55rem 0.7rem; border: 1px solid #e7e5e4;
          border-radius: 6px; font-size: 0.85rem; background: #fff;
          color: #1c1917; font-family: monospace;
        }
        .feed-url button {
          padding: 0.55rem 1rem; border: none; border-radius: 6px;
          background: #0d6efd; color: #fff; font-size: 0.85rem; font-weight: 600;
          cursor: pointer; white-space: nowrap;
        }
        .feed-url button:hover { opacity: 0.85; }
        .items { margin-top: 2rem; }
        .items h2 { font-size: 1rem; margin-bottom: 1rem; }
        .item {
          padding: 0.8rem 0; border-bottom: 1px solid #e7e5e4;
        }
        .item:last-child { border-bottom: none; }
        .item a { font-weight: 600; color: #0d6efd; text-decoration: none; }
        .item a:hover { text-decoration: underline; }
        .item time { font-size: 0.82rem; color: #78716c; display: block; margin-top: 0.15rem; }
        .copy { font-size: 0.78rem; color: #78716c; margin-top: 2rem; }
      </style>
    </head>
    <body>
      <h1><xsl:value-of select="title"/></h1>
      <p class="subtitle"><xsl:value-of select="description"/></p>

      <div class="box">
        <p>这是一个 <strong>RSS 订阅源</strong>，不是普通网页。RSS 阅读器可以自动拉取更新，不会漏掉新文章。</p>
        <p>使用方式：复制下面的链接，粘贴到任意 RSS 阅读器中订阅即可。</p>
        <div class="feed-url">
          <input id="feed-url" type="text" readonly="readonly">
            <xsl:attribute name="value">
              <xsl:value-of select="link"/>
            </xsl:attribute>
          </input>
          <button onclick="navigator.clipboard.writeText(document.getElementById('feed-url').value);this.textContent='已复制';setTimeout(()=>this.textContent='复制',2000)">复制</button>
        </div>
        <p style="margin-top:0.8rem;font-size:0.82rem;color:#78716c;">
          推荐阅读器：<a href="https://netnewswire.com/">NetNewsWire</a>（Mac/iOS 免费）、
          <a href="https://reederapp.com/">Reeder</a>、
          <a href="https://feedly.com/">Feedly</a>、
          <a href="https://www.inoreader.com/">Inoreader</a>
        </p>
      </div>

      <div class="items">
        <h2>最近文章</h2>
        <xsl:for-each select="item[position() &lt;= 15]">
          <div class="item">
            <a>
              <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
              <xsl:value-of select="title"/>
            </a>
            <time>
              <xsl:value-of select="pubDate"/>
            </time>
          </div>
        </xsl:for-each>
      </div>

      <p class="copy"><xsl:value-of select="copyright"/> · <xsl:value-of select="lastBuildDate"/></p>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
