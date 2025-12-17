// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false, // Set to true for 308 permanent redirect
      },
    ]
  },
}