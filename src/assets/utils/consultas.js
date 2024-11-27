const basePath = 'https://multishopapi.onrender.com'
export const loguerUsers = ({username, password}) => {
    return fetch(`${basePath}/api/usuario/login`, {

        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const registerUsers = ({name, username, email, password , role}) => {
    return fetch(`${basePath}/api/usuario/`, {

        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password , name , email , role})
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}
export const obtenerProductos = () => {
    return fetch(`${basePath}/api/productos/`, {
        method: 'GET',
        headers: { "Content-Type": "application/json"}
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}