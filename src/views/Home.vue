<template>
  <div class="home">
    <Table :items="employees" />
  </div>
</template>

<script>
import EmployeeService from '@/services/employee'
import Table from '@/components/Table'
export default {
  name: 'home',
  components: {
    Table
  },
  data() {
    return {
      employees: [],
      busy: true
    }
  },
  created() {
    EmployeeService.getAllEmployees().then(res => {
      this.employees = res.employees
    })
  }
}
</script>
