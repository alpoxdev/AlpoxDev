import 'reflect-metadata';
export * from './models';

import {
    Connection,
    createConnection,
    getConnectionManager,
    EntitySchema,
} from 'typeorm';
import { User, Post, Tag } from './models';
import * as models from './models';
import { MYSQL } from '../config';

const { host, user, password, database, logging, synchronize } = MYSQL;

let connection: Connection | undefined;

const getConnectApickConnection = async () => {
    const connectionName = 'default';
    const connectionManager = getConnectionManager();

    if (connectionManager.has(connectionName)) {
        connection = connectionManager.get(connectionName);
        if (!connection.isConnected) {
            await connection.connect();
        }
    } else {
        connection = await createConnection({
            type: 'mysql',
            host,
            name: connectionName,
            username: user,
            password,
            database,
            logging,
            entities: [User, Post, Tag],
        });

        if (synchronize) await connection.synchronize();
    }

    return connection;
};

const connectDatabase = async () => {
    const connection = await getConnectApickConnection();

    return {
        connection,
        getRepository: <Entity>(entity: EntitySchema<Entity>) =>
            connection.getRepository(entity),
        models,
    };
};

export { connectDatabase };
