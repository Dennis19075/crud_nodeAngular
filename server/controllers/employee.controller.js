const Employee = require('../models/employee')

const employee_controller = {};

employee_controller.getEmployees = async (req, res) => {
    const employees = await Employee.find()
    res.json(employees)
}

employee_controller.getEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id)
    res.json(employee)
}

employee_controller.createEmployee = async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save()
    res.send('Recibido!')
}

employee_controller.updateEmployee = async (req, res) => {
    
    const { id } = req.params
    const employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    }

    await Employee.findByIdAndUpdate(id, {$set: employee}, {new:true})
    res.json({status:'Employee update'})
}

employee_controller.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndRemove(req.params.id)
    res.json({status: "Employee remove"})
}

module.exports = employee_controller;