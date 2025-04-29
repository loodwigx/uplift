import express from "express";
import router from "./router.ts";

const PORT = 3000

const app = express();
app.use(express.json());
app.use("", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
