function saveUser(user) {
    const value = JSON.stringify(user);
    localStorage.setItem('user', value);
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function removeUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
}

const ls = {
    saveUser,
    getUser,
    removeUser
}

function useLocalStorage() {
    return ls;
}

export { useLocalStorage }