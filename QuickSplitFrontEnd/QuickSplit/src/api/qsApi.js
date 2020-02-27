import axios from 'axios'

export default axios.create({
  baseURL: 'http://ec2-52-53-218-230.us-west-1.compute.amazonaws.com:8000/'
})
