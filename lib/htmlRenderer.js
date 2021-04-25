const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const display = employees => {
  const html = [];

  html.push(...employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => displayManager(manager))
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => displayEngineer(engineer))
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => displayIntern(intern))
  );

  return createMain(html.join(""));

};

const displayManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = updateValue(template, "name", manager.getName());
  template = updateValue(template, "role", manager.getRole());
  template = updateValue(template, "email", manager.getEmail());
  template = updateValue(template, "id", manager.getId());
  template = updateValue(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const displayEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = updateValue(template, "name", engineer.getName());
  template = updateValue(template, "role", engineer.getRole());
  template = updateValue(template, "email", engineer.getEmail());
  template = updateValue(template, "id", engineer.getId());
  template = updateValue(template, "github", engineer.getGithub());
  return template;
};

const displayIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = updateValue(template, "name", intern.getName());
  template = updateValue(template, "role", intern.getRole());
  template = updateValue(template, "email", intern.getEmail());
  template = updateValue(template, "id", intern.getId());
  template = updateValue(template, "school", intern.getSchool());
  return template;
};

const createMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return updateValue(template, "team", html);
};

const updateValue = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = display;