import { debbug, _error } from "../utils/chalk";

export const bootstrap = async () => {
    if(process.env.NODE_ENV?.includes('development')) {
        debbug(' BOOSTRAP INIT')
       
    }
}