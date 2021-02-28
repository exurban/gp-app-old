/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

const globby = require("globby");
const prettier = require("prettier");

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby(["pages/**/*{.js,.tsx,.mdx}", "!pages/_*.js", "!pages/api"]);

  // I don't know the exact folder structure, but load your raw files
  const modules = await globby(["modules/**/*{.js,.mdx}"]);
  const docs = await globby(["docs/**/*{.js,.mdx}"]);

  // Combine them into the pages you care about
  const allPages = [...pages, ...modules, ...docs];
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${allPages
              .map(page => {
                const path = page.replace("pages", "").replace(".js", "").replace(".mdx", "");
                const route = path === "/index" ? "" : path;

                return `
                        <url>
                            <loc>${`https://gibbs-photography.com${route}`}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html"
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
})();
