module.exports = {
	db: process.env.MONGODB || 'mongodb://localhost:27017/auth-node-mongo',
	mongoConnection: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	}
};
