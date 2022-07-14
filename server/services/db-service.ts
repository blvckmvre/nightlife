import { Pool } from "pg";
import { IToken, IUser } from "../../src/types/auth";
import { IBarUser } from "../../src/types/bars";
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.POSTGRES,
    ssl: {
        rejectUnauthorized: false
    }
});

class DBService {
    async createTables() {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS night_users(
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(16) UNIQUE NOT NULL,
                    password TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS night_tokens(
                    user_id INTEGER UNIQUE NOT NULL,
                    token TEXT UNIQUE NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES night_users(id)
                );
                CREATE TABLE IF NOT EXISTS bar_users(
                    bar_id TEXT NOT NULL,
                    username VARCHAR(16) NOT NULL,
                    FOREIGN KEY (username) REFERENCES night_users(username)
                );
            `);
            console.log("tables created");
        } catch(e) {
            throw e;
        }
    }
    async addUser(username: string, hash: string) {
        try {
            const res = await pool.query<IUser>(`
                INSERT INTO night_users(username, password)
                VALUES('${username}', '${hash}')
                RETURNING id;
            `);
            return res.rows[0].id;
        } catch(e) {
            throw e;
        }
    }
    async getUserById(id: number) {
        try {
            const res = await pool.query<IUser>(`
                SELECT * FROM night_users
                WHERE id=${id};
            `);
            return res.rows[0]; 
        } catch(e) {
            throw e;
        }
    }
    async getUserByName(username: string) {
        try {
            const res = await pool.query<IUser>(`
                SELECT * FROM night_users
                WHERE username='${username}';
            `);
            return res.rows[0]; 
        } catch(e) {
            throw e;
        }
    }
    async addToken(id: number, token: string) {
        try {
            await pool.query(`
                INSERT INTO night_tokens(user_id, token)
                VALUES(${id}, '${token}');
            `);
        } catch(e) {
            throw e;
        }
    }
    async updateToken(id: number, token: string) {
        try {
            await pool.query(`
                UPDATE night_tokens
                SET token='${token}'
                WHERE user_id=${id};
            `)
        } catch(e) {
            throw e;
        }
    }
    async rmToken(token: string) {
        try {
            await pool.query(`
                DELETE FROM night_tokens
                WHERE token='${token}';
            `)
        } catch(e) {
            throw e;
        }
    }
    async getTokenById(id: number) {
        try {
            const res = await pool.query<IToken>(`
                SELECT * FROM night_tokens
                WHERE user_id=${id};
            `);
            return res.rows[0];
        } catch(e) {
            throw e;
        }
    }
    async getTokenByEncoded(token: string) {
        try {
            const res = await pool.query<IToken>(`
                SELECT * FROM night_tokens
                WHERE token='${token}';
            `);
            return res.rows[0];
        } catch(e) {
            throw e;
        }
    }

    async getBarUsers() {
        try {
            const res = await pool.query<IBarUser>(`
                SELECT * FROM bar_users;
            `);
            return res.rows;
        } catch(e) {
            throw e;
        }
    }
    async getBarUsersById (bar_id: string) {
        try {
            const res = await pool.query<IBarUser>(`
                SELECT * FROM bar_users
                WHERE bar_id='${bar_id}';
            `);
            return res.rows
        } catch(e) {
            throw e;
        }
    }
    async getOneBarUser(bar_id: string, username: string) {
        try {
            const res = await pool.query<IBarUser>(`
                SELECT * FROM bar_users
                WHERE bar_id='${bar_id}'
                AND username='${username}';
            `)
            return res.rows[0];
        } catch(e) {
            throw e;
        }
    }
    async addUserToBar(bar_id: string, username: string) {
        try {
            await pool.query(`
                INSERT INTO bar_users(bar_id, username)
                VALUES('${bar_id}', '${username}');
            `);
        } catch(e) {
            throw e;
        }
    }
    async rmUserFromBar(bar_id: string, username: string) {
        try {
            await pool.query(`
                DELETE FROM bar_users
                WHERE bar_id='${bar_id}'
                AND username='${username}';
            `)
        } catch(e) {
            throw e;
        }
    }
}

export default new DBService();