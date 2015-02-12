module.exports = {
  cookie : {
    name: 'ltk_session',
    expire: new Date(Date.now() + 604800000),
    path: '/',
  }
}
