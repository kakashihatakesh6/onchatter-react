const users = [];

const userJoin = (id, username, room) => {

    const user = {id, username, room};
    users.push(user)

    return user;

}

// user leaves the chat
const removeUser = (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1){
        return users.splice(userIndex, 1)[0]
    }
}

module.exports = {
    userJoin,
    removeUser
}