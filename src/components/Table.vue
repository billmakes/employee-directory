<template>
  <div class="Table">
    <h2>ABC Corp Employee Directory</h2>
    <div class="Table__Input">
      <b-input placeholder="Filter employees by keyword..." v-model="filter" />
      <div class="Table__Input--PerPage">
        <span>Per Page:</span>
        <b-form-select
          v-model="perPage"
          :options="perPageOptions"
          text="Per Page"
        ></b-form-select>
      </div>
    </div>
    <b-table
      id="Table"
      responsive
      :items="items"
      striped
      bordered
      hover
      :filter="filter"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template slot="edit" slot-scope="row">
        <b-button size="sm" @click="viewItem(row.item)" class="mr-2"
          >View</b-button
        >
      </template>
    </b-table>
    <div class="Table__Footer">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="Table"
      ></b-pagination>
      <b-button v-b-modal.add-modal variant="primary">Add Employee</b-button>
    </div>
    <b-modal id="add-modal">
      <template slot="modal-header">
        <h5>Add a New Employee</h5>
      </template>
      {{ params }}
      <div>
        <h5>First name</h5>
        <b-form-input
          id="input-1"
          label="Name"
          v-model="params.firstName"
          trim
        ></b-form-input>
        <h5>Last name</h5>
        <b-form-input
          id="input-1"
          label="Name"
          v-model="params.lastName"
          trim
        ></b-form-input>
        <h5>Department</h5>
        <b-form-input
          id="input-1"
          label="Name"
          v-model="params.department"
          trim
        ></b-form-input>
        <h5>Title</h5>
        <b-form-input
          id="input-1"
          label="Name"
          v-model="params.title"
          trim
        ></b-form-input>
      </div>
      <template slot="modal-footer" slot-scope="{ hide }">
        <b-button @click="hide('forget')">Cancel</b-button>
        <b-button variant="primary" @click="addEmployee()">Add</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import EmployeeService from '@/services/employee'

export default {
  name: 'Table',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      perPageOptions: ['5', '10', '15', '20'],
      filter: '',
      params: {
        firstName: '',
        lastName: '',
        department: '',
        title: ''
      },
      fields: {
        edit: {
          label: '',
          sortable: false
        },
        firstName: {
          sortable: true
        },
        lastName: {
          sortable: true
        },
        department: {
          sortable: true
        },
        title: {
          sortable: true
        }
      }
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
    viewItem(item) {
      this.$router.push({ path: `/employee/${item.id}` })
    },
    addEmployee() {
      this.$root.$emit('bv::hide::modal', 'add-modal')
      EmployeeService.addEmployee(this.params).then(res => {
        const employeeId = res.data.employee.id
        this.$router.push({ name: 'employee', params: { id: employeeId } })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.Table {
  cursor: pointer !important;
  &__Input {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    &--PerPage {
      display: flex;
      min-width: 200px;
      margin-left: 20px;
      align-items: center;
      span {
        min-width: 80px;
      }
    }
  }
  &__Footer {
    display: flex;
    justify-content: space-between;
    max-height: 38px;
  }
}
</style>
