<template>
  <div class="home">
    <div>
      <router-link class="link link-active" to="/">Сотрудники</router-link>
      <br>
      <router-link class="link" to="/companies">Компании</router-link>

      <v-toolbar dark flat>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >Добавить сотрудника</v-btn>
          </template>
          <v-card dark>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                        v-model="editedItem.first_name"
                        label="Имя"
                        outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                        v-model="editedItem.last_name"
                        label="Фамилия"
                        outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                        v-model="editedItem.age"
                        label="Возраст"
                        outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                        v-model="editedItem.department"
                        label="Отдел"
                        outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                        v-model="editedItem.company_id"
                        label="ID компании"
                        outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Отмена
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card dark>
            <v-card-title class="text-h5">Удалить?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </div>
    <div>
      <v-data-table
        dark
        :headers="headers"
        :items="items"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <img
              src="@/assets/edit.png"
              alt="edit"
              class="mr-2 action-button"
              @click="editItem(item)"
          />
          <img
              src="@/assets/delete.png"
              alt="delete"
              class="action-button"
              @click="deleteItem(item)"
          />
        </template>

        <template v-slot:no-data>
          Нет данных
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>

import { mapActions } from "vuex";

export default {
  data: () => ({
    headers: [
      {
        text: "ID",
        align: 'start',
        value: "id",
      },
      {
        text: "Имя",
        value: "first_name",
      },
      {
        text: "Фамилия",
        value: "last_name",
      },
      {
        text: "Возраст",
        value: "age",
      },
      {
        text: "Отдел",
        value: "department",
      },
      {
        text: "Компания",
        value: "company.name",
      },
      {
        text: "Действия",
        value: "actions",
      },
    ],
    items: [],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      first_name: "",
      last_name: "",
      age: "",
      department: "",
      company_id: "",
    },
    defaultItem: {
      first_name: "",
      last_name: "",
      age: "",
      department: "",
      company_id: "",
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Добавить' : 'Изменить'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  async created () {
    await this.loadData();
  },

  methods: {
    ...mapActions(['loadEmployees', 'addEmployee', 'updateEmployee', 'deleteEmployee']),

    async loadData () {
      this.items = await this.loadEmployees();
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.deleteEmployee(this.items[this.editedIndex].id);
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        const body = await this.updateEmployee({ employeeId: this.editedItem.id, params: this.editedItem });
        this.items.splice(this.editedIndex, 1, body);
      } else {
        await this.addEmployee(this.editedItem);
        await this.loadData();
      }
      this.close()
    },
  },
}
</script>
