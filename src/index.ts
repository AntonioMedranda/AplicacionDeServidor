import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("Base de datos conectada ✅");
  })
  .catch((error) => console.log(error));
