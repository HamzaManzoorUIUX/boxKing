import { create } from 'apisauce'
export const api = create({
    baseURL: 'https://devboxking.boxking.ch/laravel/api',
    headers: { Accept: 'application/vnd.github.v3+json' ,'Content-Type':'application/json'},
  })


  export const urlImg="https://devboxking.boxking.ch/laravel/";
  //http://127.0.0.1:8000/api
  //https://devreact.boxking.ch/laravel/api