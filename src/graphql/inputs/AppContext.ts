import { Request, Response } from "express";
import { User } from "../../orm/entity/User";

export interface AppContext {
  req: Request;
  res: Response;
  user: User;
}
