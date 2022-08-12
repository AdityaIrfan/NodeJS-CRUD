import dotenv from 'dotenv';

dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWWORD = process.env.MONGO_PASSWWORD || '';
const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : '1234';

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};