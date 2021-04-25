const Manager = require("./lib/Manager");
// const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "group.html");

const render = require("./lib/htmlRenderer");

const employees = [];


function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the manager's id?",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the manager's email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's office number?",
      },
    ])
    .then((response) => {
      const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      employees.push(manager);

      nextEmployee();
    });
}

function nextEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Who else would you like to add to the team?",
        name: "name",
        choices: ["Intern", "Engineer", "Done"],
      },
    ])
    .then((response) => {
      if (response.name === "Intern") {
        createIntern();
      } else if (response.name === "Engineer") {
        createEngineer();
      } else {
        createTeam();
      }
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the intern's id?",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the intern's email?",
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the intern's school?",
      },
    ])
    .then((response) => {
      const intern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      employees.push(intern);

      nextEmployee();
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the engineer's id?",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "Please enter the engineer's Github?",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      employees.push(engineer);

      nextEmployee();
    });
}

function createTeam(){
  console.log("Your team was successfully created!")
  fs.writeFileSync(outputPath, render(employees), "utf8");
}

//FUNCTION CALLS

createManager();