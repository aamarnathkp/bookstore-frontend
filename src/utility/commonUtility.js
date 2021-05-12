export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}


export const searchBook = (type, searchKey, allBooks) => {
    switch (type) {
        case 'books':
            if (searchKey === '') {
                return allBooks
            }
            const searchLower = searchKey.toLowerCase();
            const allBooksU = allBooks.filter(({ name }) => {
                const nameLower = name.toLowerCase();
                return nameLower.includes(searchLower);
            })
            return allBooksU;
        default: return allBooks;
    }
}