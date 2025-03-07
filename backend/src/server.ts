import app from "./app";
import connectDB from "./config/db";
import cors from "cors";
app.use(cors());

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
