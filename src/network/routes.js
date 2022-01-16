export default {
    employees: {
        get: 'employees',
        item (id) { return "employees/" + id },
    },
    companies: {
        get: 'companies',
        item (id) { return "companies/" + id },
    },
}