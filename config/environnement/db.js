switch (process.env.NODE_ENV || 'development'){
  case 'development':
    module.exports = {
      mongo_uri: process.env.MONGOLAB_URI
    }
  case 'production':
    module.exports = {
       mongo_uri: 'mongodb://localhost/ltk'
    }
}
