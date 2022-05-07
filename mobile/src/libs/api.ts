import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.15.19:3301'//colocar ip da maquina em modo dev
})