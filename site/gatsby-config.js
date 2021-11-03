module.exports = {
  flags: {
    DEV_SSR: false
  },
  // plugins: [
  //   'gatsby-plugin-antd'
  // ],
  plugins: [
    {
      resolve:  "@elegantstack/gatsby-theme-flexiblocks" , 
      // resolve: 'gatsby-plugin-antd',
      options: {
        
        createDemoPages: true,
        colorMode: false,
        icon: "./public/favicon.png",
      }
    },
    {
      resolve: 'gatsby-plugin-antd',
      // options: {
      //   style: true
      // }
    }
  ],
  // Customize your site metadata
  siteMetadata: {
    title: 'iFinance',
    name: 'iFinance',
    description: 'iFinance'
  }
}
