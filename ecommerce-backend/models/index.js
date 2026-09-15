import { Sequelize } from "sequelize";
import sqlJsAsSqlite3 from "sql.js-as-sqlite3";
import fs from "fs";

export let sequelize;

const databaseUrl = process.env.DATABASE_URL;

if (databaseUrl) {
  // Production: Render PostgreSQL
  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // Local development: SQLite
  sequelize = new Sequelize({
    dialect: "sqlite",
    dialectModule: sqlJsAsSqlite3,
    logging: false,
  });

  // Save database to file after write operations.
  sequelize.addHook("afterCreate", saveDatabaseToFile);
  sequelize.addHook("afterDestroy", saveDatabaseToFile);
  sequelize.addHook("afterUpdate", saveDatabaseToFile);
  sequelize.addHook("afterSave", saveDatabaseToFile);
  sequelize.addHook("afterUpsert", saveDatabaseToFile);
  sequelize.addHook("afterBulkCreate", saveDatabaseToFile);
  sequelize.addHook("afterBulkDestroy", saveDatabaseToFile);
  sequelize.addHook("afterBulkUpdate", saveDatabaseToFile);
}

export async function saveDatabaseToFile() {
  const dbInstance = await sequelize.connectionManager.getConnection();
  const binaryArray = dbInstance.database.export();
  const buffer = Buffer.from(binaryArray);

  fs.writeFileSync("database.sqlite", buffer);
}
