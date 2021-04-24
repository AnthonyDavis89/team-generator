const Engineer = require("./employee");

class Manager extends Employee {

    constructor(name,id,email,officeNumber) {
        super(name,id,email,officeNumber);
        this.officeNumber = officeNumber;
       
        super.role = "Manager";
    }
    
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;