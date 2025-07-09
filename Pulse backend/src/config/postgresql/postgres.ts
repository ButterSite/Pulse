// src/config/postgresql/postgres.ts
import pkg from 'pg';
const { Pool } = pkg;
import type { Pool as PoolType } from 'pg';
import * as bcrypt from 'bcrypt';

import type { PostgresPoolInterface } from '../../tsInterfaces/postgresInterfaces/postgreConfig.js';
import type { UserSignInData, SignUpData } from '../../tsInterfaces/postgresInterfaces/userInterfaces.js';
import type { SignResponse } from '../../tsInterfaces/postgresInterfaces/apiResponse.js';
import { generateToken } from '../../assets/jwtTokens.ts';


class PostgreSql {
    private pool: PoolType;

    constructor() {
        const requiredEnvVars = ['POSTGRES_HOST', 'POSTGRES_DB_NAME', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_PORT'];
        const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
        if (missingVars.length > 0) {
            throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
        }

        this.pool = new Pool({
            host: process.env.POSTGRES_HOST!,
            database: process.env.POSTGRES_DB_NAME!,
            user: process.env.POSTGRES_USER!,
            password: process.env.POSTGRES_PASSWORD!,
            port: Number(process.env.POSTGRES_PORT) || 5432
        });
    }


    async getUserData(username: string) {
        try {
            const response = await this.pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
            );

            return response.rows[0];
        }catch(error) {
            throw new Error(`Error in getUserData: ${String(error)}`);
        }

    }

    async getPostgresConfig(): Promise<PostgresPoolInterface> {
        return {
            host: process.env.POSTGRES_HOST ?? '',
            database: process.env.POSTGRES_DB_NAME ?? '',
            user: process.env.POSTGRES_USER ?? '',
            password: process.env.POSTGRES_PASSWORD ?? '',
            port: Number(process.env.POSTGRES_PORT) || 5432
        };
    }

    async connectToPostgre(): Promise<void> {
        try {
            const response: any = await this.pool.query('SELECT NOW()');
            console.log('Connected to PostgreSQL', response.rows[0]);
        } catch (error: unknown) {
            console.error(`Error connecting to PostgreSQL: ${String(error)}`);
            throw error;
        }
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async signInByUsername(userData: UserSignInData): Promise<SignResponse> {
        const { username, password } = userData;
        if (!username || !password) {
            return { success: false, message: 'Username and password are required', resCode: 400 };
        }
        try {
            const response: any = await this.pool.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            );
            if (response.rows.length === 0) {
                return { success: false, message: 'No account found with this username.', resCode: 404 };
            }
            const user = response.rows[0]
            const hashedPassword = user.password;
            const isMatch = await bcrypt.compare(password, hashedPassword);
            if (!isMatch) {
                return { success: false, message: 'Invalid password', resCode: 401 };
            }
            const token: string = await generateToken(user.id, user.username);

            return { success: true, token: token, resCode: 200 };
        } catch (error: unknown) {
            throw new Error(`Failed to sign in (signInByUsername): ${String(error)}`);
        }
    }

    async createUser(userData: SignUpData): Promise<SignResponse> {
        const { username, firstName, lastName, email, password } = userData;
        if (!username || !firstName || !lastName || !email || !password) {
            return { success: false, message: 'All fields are required', resCode: 400 };
        }

        try {
            const checkResponse: any = await this.pool.query(
                'SELECT 1 FROM users WHERE username = $1 OR email = $2',
                [username, email]
            );
            if (checkResponse.rows.length > 0) {
                return { success: false, message: 'Username or email already exists', resCode: 409 };
            };

            const hashedPassword = await this.hashPassword(password);
            const response: any = await this.pool.query(
                'INSERT INTO users (username, firstName, lastName, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [username, firstName, lastName, email, hashedPassword]
            );

            if (response.rows.length === 0) {
            return { success: false, message: 'Error with creating user', resCode: 500 };
            }
            const user = response.rows[0];

            const token: string = await generateToken(user.ID, user.username);

            return { success: true, token, resCode: 200 };
        } catch (error: unknown) {
            console.error(`Error in createUser: ${String(error)}`);
            throw new Error(`Failed to create user: ${String(error)}`);
        }
    }

    async closeConnection(): Promise<void> {
        await this.pool.end();
        console.log('PostgreSQL connection closed');
    }
}

export default PostgreSql





