import axios from 'axios';

export default axios.create({
  baseURL: 'https://tlim-shoppies.herokuapp.com/api'
})