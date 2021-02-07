import { Sequelize } from 'sequelize-typescript';

import { PGSQL } from '../config';
import { User, Post, Tag, PostTag, Comment, Category, Series } from '.';

export let sequelize;
const force: boolean = false;

export const onConnectDatabase = async () => {
    if (!sequelize) {
        sequelize = await new Sequelize(
            PGSQL.database,
            PGSQL.username,
            PGSQL.password,
            {
                dialect: 'postgres',
                host: PGSQL.host,
                models: [User, Post, Comment, Category, Series, Tag, PostTag],
            }
        );
    }

    try {
        await sequelize.authenticate();

        // await User.sync({ force });

        // await Category.sync({ force });
        // await Series.sync({ force });

        // await Post.sync({ force });
        // await Comment.sync({ force });
        // await Tag.sync({ force });
        // await PostTag.sync({ force });

        console.log(`Success`, `connecting database!`);
    } catch (error) {
        console.warn(`Error`, error);
    }
};
