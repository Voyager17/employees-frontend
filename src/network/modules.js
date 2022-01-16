import base from "@/network/base";
import routes from "@/network/routes";

export default {

    async loadEmployees(params) {
        return await base.execute('get', routes.employees.get, params);
    },

    async addEmployee(params) {
        return await base.execute('post', routes.employees.get, params);
    },

    async updateEmployee(employeeId, params) {
        return await base.execute('put', routes.employees.item(employeeId), params);
    },

    async deleteEmployee(employeeId) {
        return await base.execute('delete', routes.employees.item(employeeId));
    },

    async loadProducts(params) {
        return await base.execute('get', routes.companies.get, params);
    },

    async createCompany(params) {
        return await base.execute('post', routes.companies.get, params);
    },

    async updateCompany(actorId, params) {
        return await base.execute('put', routes.companies.item(actorId), params);
    },

    async deleteCompany(actorId) {
        return await base.execute('delete', routes.companies.item(actorId));
    },

}
