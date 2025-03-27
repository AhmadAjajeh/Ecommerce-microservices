import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // server

    // creating a precofigured api of axios
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // browser
    return axios.create({
      baseURL: '/',
    });
  }
};
