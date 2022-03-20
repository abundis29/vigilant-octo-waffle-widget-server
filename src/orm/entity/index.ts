import { Connection, getConnectionOptions, createConnection } from "typeorm";
import { info } from "../../utils/chalk";

export let connection: Connection

//create
export const getConnection = async () => {
	info(process.env.NODE_ENV)
	const options = await getConnectionOptions(
		process.env.NODE_ENV || "development"
	);
	if (!connection || !connection.isConnected) {
		connection = await createConnection({ ...options, name: "default" })
	}
	return connection
}
//clear
export const clearConnection = async () => {
	const entities = connection.entityMetadatas;

	entities.forEach(async (entity) => {
		const repository = connection.getRepository(entity.name);
		await repository.query(`DELETE FROM ${entity.tableName}`);
	});
}
//close
export const closeConnection = async () => {
	await connection && connection.isConnected && connection.close()
}