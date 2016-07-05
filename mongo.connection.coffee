mongoose = require("mongoose")

DBName = 'spider'
DBHOST = '127.0.0.1'
DBHOST = 'spider.591ku.com'

uri = "mongodb://#{DBHOST}/#{DBName}"

console.log(uri)

mongoose.connect uri, {
	server: {
		poolSize: 12 # 默认是5
	}
	user: 'alex'
	pass: 'alex'
	auth: {
		authdb: 'admin'
	}
}

# db.createUser(
# 	{
# 		user: "alex",
# 		pwd: "passweibo",
# 		roles: ["readWriteAnyDatabase", "userAdminAnyDatabase"]
# 	}
# )
