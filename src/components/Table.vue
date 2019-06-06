<template>
  <div class="Table">
    <b-table
      id="Table"
      responsive
      :items="items"
      striped
      bordered
      hover
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
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="Table"
    ></b-pagination>
  </div>
</template>

<script>
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
      perPage: 8,
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
    }
  }
}
</script>
