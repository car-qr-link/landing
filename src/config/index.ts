export default {
    port: process.env.PORT || 3000,
    db: {
        url: process.env.DATABASE_URL || "mysql://landing:landing@localhost:3306/landing",
    },
};
