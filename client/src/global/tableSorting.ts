export const requestSort = (key: string, sortConfig: SortConfig, setSortConfig: SetSortConfig) => {
    let direction = 'ascending';
    if (sortConfig.key && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  export const sortingFunction = (sortConfig: SortConfig, array: Array<any>) => {
    let sortableItems = [...array];
    if (sortConfig.key !== '') {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }