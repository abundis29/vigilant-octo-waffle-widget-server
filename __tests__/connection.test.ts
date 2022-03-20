import { clearConnection, getConnection } from "../src/orm/entity";



it.skip('creates a user', async () => {
    beforeAll(async () => {
        await getConnection()

    });

    afterAll(async () => {
        await clearConnection()
    });

    beforeEach(async () => {
        await clearConnection()
    });
})