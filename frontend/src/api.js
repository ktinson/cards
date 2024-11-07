let apiURL;

if (process.env.NODE_ENV === "development") {
  apiURL =  "https://cards-backend-1hpn.onrender.com" || process.env.REACT_APP_API_URL
} else {
  apiURL = "https://cards-backend-1hpn.onrender.com";
}
export default apiURL;
