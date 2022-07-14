import { ValidationError } from "express-validator";
import { JsonWebTokenError } from "jsonwebtoken";
import { DatabaseError } from "pg";

export type ErrorsType = 
Error | 
ValidationError | 
DatabaseError |
JsonWebTokenError;