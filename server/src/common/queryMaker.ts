export const insertQueryParams = (body: any, tableName: string) => {
	let queryString = '';
	let values = '';
	let valueCount = 1;
	const paramsArray = [];
	for(const [key, value] of Object.entries(body)){
			queryString += queryString ? `, ${key}` : key;
			values += values ? `, $${valueCount}` : `$${valueCount}`;
			paramsArray.push(value);
			valueCount++;
	}
	return {
			query: `INSERT INTO ${tableName} (${queryString}) VALUES (${values}) RETURNING*`,
			params: paramsArray
	}
}

export const updateQueryParams = (body: any, id: string, tableName: string) => {
	let queryString = '';
	let valueCount = 1;
	const paramsArray = [];
	for(const [key, value] of Object.entries(body)){
			queryString += queryString ? `, ${key} = $${valueCount}` : `${key} = $${valueCount}`;
			paramsArray.push(value);
			valueCount++;
	}
	return {
			query: `UPDATE ${tableName} SET ${queryString}
				WHERE id = $${valueCount} RETURNING*`,
			params:[...paramsArray, id]
	}
}