
function getCssJudge(m) {
  const issuer = m.issuer;
  if (issuer) {
    console.log('###########')
    console.log(m.constructor.name)
    return getCssJudge(m.issuer);
  }
  console.log(m);
  console.log('####################################################')
  // console.log(c);
  return process.env.NODE_ENV === 'development' ? m.name : Array.from(m._chunks)[0].name
  // return Array.from(m._chunks)[0].name
  // return false
}
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
  },
  configureWebpack: config => {

    config.optimization.splitChunks.cacheGroups = {
      styles: {
        name: 'bundle',
        test: (m,c) => { getCssJudge(m,c);return m.constructor.name === 'CssModule' && getCssJudge(m) === 'app'},
        chunks: 'all',
        priority: 1000,
        enforce: true
      },
    }
    console.log(config.optimization.splitChunks.cacheGroups)
  },
  css: {
    extract: true
  }
}
