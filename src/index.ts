require('dotenv').config()
import "reflect-metadata";
import { SERVER } from "./config/express";
import { info, _error } from "./utils/chalk";
import { logo } from "./utils/logo";


info(logo)
export const app = async () => SERVER()
app().catch((error) => _error(error))
