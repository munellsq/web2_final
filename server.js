require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./db");

require("./models/User");
require("./models/Artist");
require("./models/Album");
require("./models/Song");
require("./models/Playlist");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const playlistRoutes = require("./routes/playlists.routes");
const externalRoutes = require("./routes/external.routes");

const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/external", externalRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
