let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },

    avatar: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      enum: [
        "sales",
        "marketing",
        "hr",
        "developer",
        "administrative",
        "common",
        "security",
        "management"
      ],
      default: "common",
    },

    refreshToken: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

employeeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;
