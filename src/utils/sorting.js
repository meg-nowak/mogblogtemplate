export const sortData = (data, { sortBy, order = 'desc' }) => {
    return [...data].sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        // Handle date strings
        if (sortBy === 'date') {
            valA = new Date(valA);
            valB = new Date(valB);
        }

        // Standard comparison
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });
};