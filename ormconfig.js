module.exports = [
  {
    name: "staging",
    type: "sqlite",
    database: "database.sqlite",
    dropSchema: true,
    autoSchemaSync: true,
    synchronize: true,
    logging: false,
    entities: ["src/orm/entity/**/*.ts"],
    migrations: ["src/orm/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/orm/entity",
      migrationsDir: "src/orm/migration",
      subscribersDir: "src/orm/subscriber"
    }
  },
  {
    name: "development",
    type: "postgres",
    autoSchemaSync: true,
    dropSchema: true,
    url: 'postgresql://nerdter:N3RDTER@@localhost:5432/nerdter',
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ["src/orm/entity/**/*.ts"],
    migrations: ["src/orm/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/orm/entity",
      migrationsDir: "src/orm/migration",
      subscribersDir: "src/orm/subscriber"
    }
  },
  {
    name: "default",
    type: "postgres",
    url: 'postgresql://nerdter:N3RDTER@@localhost:5432/nerdter',
    dropSchema: true,
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ["dist/orm/entity/**/*.js"],
    migrations: ["dist/orm/migration/**/*.js"],
    subscribers: ["dist/orm/subscriber/**/*.js"],
    cli: {
      entitiesDir: "dist/orm/entity",
      migrationsDir: "dist/orm/migration",
      subscribersDir: "dist/orm/subscriber"
    }
  },
  {
    name: "production",
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ["dist/orm/entity/**/*.js"],
    migrations: ["dist/orm/migration/**/*.js"],
    subscribers: ["dist/orm/subscriber/**/*.js"],
    cli: {
      entitiesDir: "dist/orm/entity",
      migrationsDir: "dist/orm/migration",
      subscribersDir: "dist/orm/subscriber"
    }
  }
];