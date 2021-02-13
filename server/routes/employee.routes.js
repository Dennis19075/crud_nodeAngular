const express = require('express')
const { model } = require('mongoose')
const router = express.Router()

const employee_controller = require('../controllers/employee.controller')

router.get('/', employee_controller.getEmployees)

router.get('/:id', employee_controller.getEmployee)

router.post('/', employee_controller.createEmployee)

router.put('/:id', employee_controller.updateEmployee)

router.delete('/:id', employee_controller.deleteEmployee)

module.exports = router;
