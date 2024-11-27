const basePath = 'http://localhost:3000'
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

export const registrarProductos = (formData,token) => {
    return fetch(`${basePath}/api/productos/`, {
        method: 'POST',
        headers: {'Authorization': token},
        body: formData  // Pasamos directamente el objeto FormData
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}
export const obtenerCategorias = () => {
    return fetch(`${basePath}/api/categorias/`, {
        method: 'GET',
        headers: { "Content-Type": "application/json"}
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}
