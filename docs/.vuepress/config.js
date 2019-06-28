module.exports = {
  base: "/openpaas-dashboard/",
  title: "OpenPaaS Dashboard",
  description: "Dashboard Application for OpenPaaS",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "Github", link: "https://github.com/linagora/openpaas-dashboard" },
    ],
    sidebar: "auto"
  },
  markdown: {
    lineNumbers: true
  }
};
