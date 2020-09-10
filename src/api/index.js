import request from '../utils/request'

export const getExample = () => {
    return request('/api/v1/example', 'GET')
}

export const postExample = () => {
    return request('/api/v1/example', 'POST', {
        student_id: 1,
        age: 10
    })
}
