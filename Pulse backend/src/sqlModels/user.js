import pool from "../config/postgresql/postgres";
import { DataTypes } from "sequelize";


const User = pool.define(`User`,{
    username: {
        unique: true
    }
})