// Database

const authors = [
    { id : 1, name: 'Kunal' },
    { id : 2, name: 'Sid' },
    { id : 3, name: 'Kanak' }
]

async function getAuthorById(authorId) {
    return authors.find(author => author.id === authorId);
}

module.exports = { getAuthorById }