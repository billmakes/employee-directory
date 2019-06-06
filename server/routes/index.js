const express = require('express')

const EmployeeController = require('../controllers/employees')

const router = express.Router()

router.get('/api/v1/employees', EmployeeController.getAllEmployees)
router.get('/api/v1/employees/:id', EmployeeController.getEmployee)
router.post('/api/v1/employees', EmployeeController.addEmployee)
router.put('/api/v1/employees/:id', EmployeeController.updateEmployee)
router.delete('/api/v1/employees/:id', EmployeeController.deleteEmployee)

module.exports = router
