import Vue from 'vue'
import Vuex from 'vuex'
import modules from "@/network/modules";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async loadEmployees({ commit }, params) {
      const response = await modules.loadEmployees(params);

      if (response.status === 200) {
        return response.body;
      }
    },

    async addEmployee({ commit }, params) {
      const response = await modules.addEmployee(params);

      if (response.status === 201) {
        return response.body;
      }
    },

    async updateEmployee({ commit }, { employeeId, params }) {
      const response = await modules.updateEmployee(employeeId, params);

      if (response.status === 200) {
        return response.body;
      }
    },

    async deleteEmployee({ commit }, employeeId) {
      const response = await modules.deleteEmployee(employeeId);

      if (response.status === 204) {
        return true;
      }
    },

    async loadCompanies({ commit }, params) {
      const response = await modules.loadProducts(params);

      if (response.status === 200) {
        return response.body;
      }
    },

    async addCompany({ commit }, params) {
      const response = await modules.createCompany(params);

      if (response.status === 201) {
        return response.body;
      }
    },

    async updateCompany({ commit }, { companyId, params }) {
      const response = await modules.updateCompany(companyId, params);

      if (response.status === 200) {
        return response.body;
      }
    },

    async deleteCompany({ commit }, companyId) {
      const response = await modules.deleteCompany(companyId);

      if (response.status === 204) {
        return true;
      }
    },
  },
  modules: {
  }
})
