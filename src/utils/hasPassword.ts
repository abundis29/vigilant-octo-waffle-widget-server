const bcrypt = require('bcrypt');

export const hashPassword = async (password: string, saltRounds: number = 10) => {
    return await bcrypt.hash(password, saltRounds);
}