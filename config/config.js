require('dotenv').config()

module.exports = {
  "development":{
    "username": process.env.DEV_PG_USERNAME,
    "password": process.env.DEV_PG_PASSWORD,
    "database": process.env.DEV_PG_DATABASE,
    "host": process.env.DEV_PG_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DEV_PG_USERNAME,
    "password": process.env.DEV_PG_PASSWORD,
    "database": process.env.DEV_PG_DATABASE,
    "host": process.env.DEV_PG_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        require: true,
        rejectUnauthorized: false
	}
    }
  }
}
