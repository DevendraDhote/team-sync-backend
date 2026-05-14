const bcrypt = require("bcrypt");
const fs = require("fs");

const firstNames = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Krishna",
  "Arjun",
  "Sai",
  "Ishaan",
  "Rohan",
  "Karan",
  "Yash",
  "Rahul",
  "Ankit",
  "Dev",
  "Harsh",
  "Mohit",
  "Aman",
  "Siddharth",
  "Raj",
  "Manav",
  "Tushar",
];

const lastNames = [
  "Sharma",
  "Patel",
  "Verma",
  "Mehta",
  "Singh",
  "Gupta",
  "Joshi",
  "Thakur",
  "Yadav",
  "Mishra",
  "Jain",
  "Agarwal",
  "Chauhan",
  "Kapoor",
  "Malhotra",
];

const departments = [
  "sales",
  "marketing",
  "hr",
  "developer",
  "administrative",
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function generateEmployees() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  let employees = [];

  for (let i = 1; i <= 100; i++) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);

    const fullName = `${firstName} ${lastName}`;

    employees.push({
      name: fullName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      password: hashedPassword,
      department: getRandomItem(departments),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  fs.writeFileSync(
    "employees.json",
    JSON.stringify(employees, null, 2)
  );

  console.log("✅ 100 Random Employees Generated");
}

generateEmployees();