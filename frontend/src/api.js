let apiURL;

if (process.env.NODE_ENV === "development") {
  apiURL = process.env.REACT_APP_API_URL || "https://cards-backend-1hpn.onrender.com"
} else {
  apiURL = "https://cards-backend-1hpn.onrender.com";
}
export default apiURL;
