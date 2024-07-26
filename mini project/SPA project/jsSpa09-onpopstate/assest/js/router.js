const pageTitle = ''

const router = {
  404: {
    template: "./404.html",
    title: `not finded | ${pageTitle}`,
  },
  "/": {
    template: "./index.html",
    title: `home | ${pageTitle}`,
  },
  "/blog": {
    template: "./blog.html",
    title: `blog | ${pageTitle}`,
  },
  "/courses": {
    template: "./courses.html",
    title: `courses | ${pageTitle}`,
  },
  "/product": {
    template: "./product.html",
    title: `product | ${pageTitle}`,
  },
  "/article": {
    template: "./article.html",
    title: `article | ${pageTitle}`,
  },
  "/cart": {
    template: "./cart.html",
    title: `cart | ${pageTitle}`,
  },
};

export default router;
