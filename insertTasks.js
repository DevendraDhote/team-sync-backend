const fs = require("fs");

const employeeIds = [
    "6a02f0d89baa2b617b23f085",
    "6a02f0d89baa2b617b23f069",
    "6a02f0d89baa2b617b23f087",
    "6a02f0d89baa2b617b23f05b",
    "6a02f0d89baa2b617b23f089",
    "6a02f0d89baa2b617b23f06b",
    "6a02f0d89baa2b617b23f08b",
    "6a02f0d89baa2b617b23f092",
    "6a02f0d89baa2b617b23f06e",
    "6a02f0d89baa2b617b23f090",
    "6a02f0d89baa2b617b23f05d",
    "6a02f0d89baa2b617b23f091",
    "6a02f0d89baa2b617b23f06f",
    "6a02f0d89baa2b617b23f093",
    "6a02f0d89baa2b617b23f055",
    "6a02f0d89baa2b617b23f095",
    "6a02f0d89baa2b617b23f071",
    "6a02f0d89baa2b617b23f097",
    "6a02f0d89baa2b617b23f05f",
    "6a02f0d89baa2b617b23f099",
    "6a02f0d89baa2b617b23f073",
    "6a02f0d89baa2b617b23f09b",
    "6a02f0d89baa2b617b23f051",
    "6a02f0d89baa2b617b23f09d",
    "6a02f0d89baa2b617b23f075",
    "6a02f0d89baa2b617b23f09f",
    "6a02f0d89baa2b617b23f061",
    "6a02f0d89baa2b617b23f0a1",
    "6a02f0d89baa2b617b23f077",
    "6a02f0d89baa2b617b23f0a3",
    "6a02f0d89baa2b617b23f057",
    "6a02f0d89baa2b617b23f0a5",
    "6a02f0d89baa2b617b23f079",
    "6a02f0d89baa2b617b23f0a7",
    "6a02f0d89baa2b617b23f063",
    "6a02f0d89baa2b617b23f0a9",
    "6a02f0d89baa2b617b23f07b",
    "6a02f0d89baa2b617b23f0ab",
    "6a02f0d89baa2b617b23f08f",
    "6a02f0d89baa2b617b23f0ad",
    "6a02f0d89baa2b617b23f07d",
    "6a02f0d89baa2b617b23f0af",
    "6a02f0d89baa2b617b23f065",
    "6a02f0d89baa2b617b23f06d",
    "6a02f0d89baa2b617b23f08e",
    "6a02f0d89baa2b617b23f08d",
    "6a02f0d89baa2b617b23f054",
    "6a02f0d89baa2b617b23f05c",
    "6a02f0d89baa2b617b23f06c",
    "6a02f0d89baa2b617b23f08c"
  ];

const statuses = ["todo", "in-progress", "completed"];
const priorities = ["low", "medium", "high"];

const titles = [
  "Design Dashboard UI",
  "Fix Authentication",
  "Create API",
  "Optimize Backend",
  "Implement Search",
  "Deploy Server",
  "Setup Notifications",
];

const descriptions = [
  "Create modern dashboard",
  "Fix login and token issues",
  "Optimize API performance",
  "Complete task before deadline",
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
  const now = new Date();

  return new Date(
    now.getTime() +
      Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  );
}

const tasks = [];

for (let i = 1; i <= 100; i++) {
  tasks.push({
    title: `${random(titles)} ${i}`,
    description: random(descriptions),
    priority: random(priorities),
    status: random(statuses),

    assignedTo: {
      $oid: random(employeeIds),
    },

    createdBy: {
      $oid: random(employeeIds),
    },

    dueDate: {
      $date: randomDate().toISOString(),
    },

    createdAt: {
      $date: new Date().toISOString(),
    },

    updatedAt: {
      $date: new Date().toISOString(),
    },
  });
}

fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));

console.log("✅ tasks.json generated successfully");