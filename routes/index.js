const userRoutes = require("./usersRoutes");
const matchRoutes = require("./matchRoutes");
const teamsRoutes = require("./teamsRoutes");
const groupRoutes = require("./groupRoutes");
const adminRoutes = require("./adminRoutes");
const stadiumsRoutes = require("./stadiumsRoutes");
const predictionRoutes = require("./predictionRoutes");
const userGroupRoutes = require("./userGroupsRoutes");

module.exports = (app) => {
  app.use("/api/admin", adminRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/matches", matchRoutes);
  app.use("/api/teams", teamsRoutes);
  app.use("/api/groups", groupRoutes);
  app.use("/api/stadiums", stadiumsRoutes);
  app.use("/api/prediction", predictionRoutes);
  app.use("/api/usergroups", userGroupRoutes);
};
