import axios from "axios";
import https from "https";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  } else {
    // We are on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};
