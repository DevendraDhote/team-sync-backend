const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
    },

    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("departments", departmentSchema);

module.exports = Department;
