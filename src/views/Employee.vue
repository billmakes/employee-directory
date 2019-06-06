<template>
  <div>
    <b-card v-show="!deleted" class="Employee">
      <h3>{{ fullName }}</h3>
      <h5>{{ department }} - {{ title }}</h5>
      <div class="Employee__Options">
        <b-button v-b-modal.edit-modal class="Employee__Options--Button"
          >Edit Info</b-button
        >
        <b-button
          v-b-modal.delete-modal
          class="Employee__Options--Button"
          variant="danger"
          >Delete Record</b-button
        >
      </div>
    </b-card>
    <div v-show="deleted">
      <h1 v-if="error">404</h1>
      <p>
        This employee record either does not exist or it may have been deleted.
      </p>
      <router-link to="/">Click here to go back home.</router-link>
    </div>
    <b-modal id="edit-modal" title="BootstrapVue">
      <template slot="modal-header">
        <h5>Edit Employee Record</h5>
      </template>
      <div>
        <h5>First name</h5>
        <b-form-input
          id="input-1"
          label="Name"
          v-model="firstName"
          trim
        ></b-form-input>
        <h5>Last name</h5>
        <b-form-input
          id="input-1"
          label="Name"
          v-model="lastName"
          trim
        ></b-form-input>
        <h5>Department</h5>
        <b-form-input
          id="input-1"
          label="Name"
          v-model="department"
          trim
        ></b-form-input>
        <h5>Title</h5>
        <b-form-input
          id="input-1"
          label="Name"
          v-model="title"
          trim
        ></b-form-input>
      </div>
      <template slot="modal-footer">
        <b-button @click="cancel()">Cancel</b-button>
        <b-button variant="primary" @click="save()">Save</b-button>
      </template>
    </b-modal>
    <b-modal id="delete-modal" title="BootstrapVue">
      <template slot="modal-header">
        <h5>Delete Employee Record</h5>
      </template>
      <p>Are you sure you want to delete employee {{ fullName }}'s record?</p>
      <template slot="modal-footer" slot-scope="{ hide }">
        <b-button @click="hide('forget')">Cancel</b-button>
        <b-button variant="danger" @click="deleteEmployee()">Yes</b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import EmployeeService from '@/services/employee'
export default {
  name: 'Employee',
  data() {
    return {
      employee: [],
      firstName: '',
      lastName: '',
      department: '',
      title: '',
      deleted: false,
      error: false
    }
  },
  created() {
    EmployeeService.getEmployee(this.$route.params.id)
      .then(res => {
        this.employee = res.employee
        this.firstName = res.employee.firstName
        this.lastName = res.employee.lastName
        this.department = res.employee.department
        this.title = res.employee.title
      })
      .catch(() => {
        this.deleted = true
        this.error = true
      })
  },
  mounted() {},
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    params() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        department: this.department,
        title: this.title
      }
    }
  },
  methods: {
    cancel() {
      this.$root.$emit('bv::hide::modal', 'edit-modal')
      this.firstName = this.employee.firstName
      this.lastName = this.employee.lastName
      this.department = this.employee.department
      this.title = this.employee.title
    },
    save() {
      this.$root.$emit('bv::hide::modal', 'edit-modal')
      EmployeeService.updateEmployee(this.$route.params.id, this.params)
      this.firstName = this.params.firstName
      this.lastName = this.params.lastName
      this.department = this.params.department
      this.title = this.params.title
    },
    deleteEmployee() {
      this.$root.$emit('bv::hide::modal', 'delete-modal')
      this.deleted = true
      EmployeeService.deleteEmployee(this.$route.params.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.Employee {
  max-width: 30rem;
  &__Options {
    display: flex;
    justify-content: flex-end;
    &--Button {
      margin-left: 10px;
    }
  }
}
</style>
