import axios from "axios";

const instance = axios.create({
  baseURL: "https://exercisedb.p.rapidapi.com/exercises",
});

export default instance;
