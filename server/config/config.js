const env = process.env.NODE_ENV || 'development';

if(env === 'development') {
    process.env.PORT = 3232;
    process.env.MONGO_URL = 'mongodb://localhost:27017/reactdb';
} else if(env === 'test') {
    process.env.PORT = 3232;
    process.env.MONGO_URL = 'mongodb://localhost:27017/reactdb';
}
