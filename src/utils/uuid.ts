import { v4 as uuidv4 } from 'uuid';

export const assignId = (req: any, _res: any, next: () => void) => {
    req.id = uuidv4()
    next()
}



