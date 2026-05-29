let express = require("express");
let cookieParser = require("cookie-parser");
let cors = require("cors");
let authRoutes = require("./routes/auth.routes");
let employeeRoutes = require("./routes/employee.routes");
let dashboardRoutes = require("./routes/dashboard.routes");
let tasksRoutes = require("./routes/tasks.routes");
let departmentRoutes = require("./routes/departments.routes");
const errorMiddleware = require("./middlewares/error.middleware");

let app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
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

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/departments", departmentRoutes);

app.use(errorMiddleware);

module.exports = app;
