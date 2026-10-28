let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let cors = require("cors");
let authRoutes = require("./routes/auth.routes");
let employeeRoutes = require("./routes/employee.routes");
let dashboardRoutes = require("./routes/dashboard.routes");
let tasksRoutes = require("./routes/tasks.routes");
let departmentRoutes = require("./routes/departments.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const {
  swaggerUi,
  swaggerSpec,
  swaggerUiOptions,
} = require("./config/swagger");

let app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://fe.team-sync.space",
        "http://localhost:5173",
        "http://localhost:3000", // your production frontend
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ← CRITICAL for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("backend running successfully");
});

// API docs
app.get("/api-reference", (req, res) =>
  res.sendFile(path.join(__dirname, "../docs/api-reference.html"))
);
app.get("/api-docs/openapi.json", (req, res) => res.json(swaggerSpec));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/departments", departmentRoutes);

app.use(errorMiddleware);

module.exports = app;
