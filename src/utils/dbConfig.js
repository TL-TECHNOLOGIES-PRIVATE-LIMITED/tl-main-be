import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();

function parseDatabaseUrl(connectionString) {
    const params = {};
    const withoutPrefix = connectionString.replace(/^sqlserver:\/\//, '');
    const parts = withoutPrefix.split(';');

    for (const part of parts) {
        const [key, value] = part.split('=');
        if (key && value) {
            params[key.trim()] = value.trim();
        }
    }

    return {
        user: params['user'],
        password: params['password'],
        server: params['SQL9001.site4now.net'] || params['server'] || 'SQL9001.site4now.net',
        database: params['database'],
        options: {
            encrypt: true,
            trustServerCertificate: params['trustServerCertificate'] === 'true'
        },
        port: parseInt(params['port'] || '1433'),
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    };
}

const dbConfig = parseDatabaseUrl(process.env.DATABASE_URL);

export default dbConfig;
