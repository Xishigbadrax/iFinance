module.exports = {
  flags: {
    DEV_SSR: false
  },
  plugins: [
    {
      resolve: '@elegantstack/gatsby-theme-flexiblocks',
      options: {
        createDemoPages: true,
        colorMode: false
      }
    }
  ],
  // Customize your site metadata
  siteMetadata: {
    title: 'iFinance',
    name: 'iFinance',
    description: 'iFinance'
  }
}
