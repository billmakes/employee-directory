const db = require('../db/db')

class EmployeesController {
  getAllEmployees(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'employees retrieved successfully',
      employees: db
    })
  }

  getEmployee(req, res) {
    const id = parseInt(req.params.id, 10)
    db.map(employee => {
      if (employee.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'employee retrieved successfully',
          employee
        })
      }
    })
    return res.status(404).send({
      success: 'false',
      message: 'employee does not exist'
    })
  }

  addEmployee(req, res) {
    if (!req.body.firstName) {
      return res.status(400).send({
        success: 'false',
        message: 'employee first name is required'
      })
    } else if (!req.body.lastName) {
      return res.status(400).send({
        success: 'false',
        message: 'employee last name is required'
      })
    } else if (!req.body.department) {
      return res.status(400).send({
        success: 'false',
        message: 'employee department is required'
      })
    } else if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'employee title is required'
      })
    }
    const employee = {
      id: db.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      department: req.body.department,
      title: req.body.department
    }
    db.push(employee)
    return res.status(201).send({
      success: 'true',
      message: 'employee added successfully',
      employee
    })
  }

  updateEmployee(req, res) {
    const id = parseInt(req.params.id, 10)
    let employeeFound
    let itemIndex
    db.map((employee, index) => {
      if (employee.id === id) {
        employeeFound = employee
        itemIndex = index
      }
    })

    if (!employeeFound) {
      return res.status(404).send({
        success: 'false',
        message: 'employee not found'
      })
    }

    if (!req.body.firstName) {
      return res.status(400).send({
        success: 'false',
        message: 'first name is required'
      })
    } else if (!req.body.lastName) {
      return res.status(400).send({
        success: 'false',
        message: 'last name is required'
      })
    }

    const updatedEmployee = {
      id: employeeFound.id,
      firstName: req.body.firstName || employeeFound.firstName,
      lastName: req.body.lastName || employeeFound.lastName,
      department: req.body.department || employeeFound.department,
      title: req.body.title || employeeFound.title
    }

    db.splice(itemIndex, 1, updatedEmployee)

    return res.status(201).send({
      success: 'true',
      message: 'employee added successfully',
      updatedEmployee
    })
  }

  deleteEmployee(req, res) {
    const id = parseInt(req.params.id, 10)

    db.map((employee, index) => {
      if (employee.id === id) {
        db.splice(index, 1)
        return res.status(200).send({
          success: 'true',
          message: 'employee deleted successfuly'
        })
      }
    })

    return res.status(404).send({
      success: 'false',
      message: 'employee not found'
    })
  }
}

const employeeController = new EmployeesController()
module.exports = employeeController
