import { Router } from "express";
import { authenticate, authorize } from "@/middlewares/auth.middleware.js";
import {
  getAllInstansiController,
  getInstansiByIdController,
  createInstansiController,
  updateInstansiController,
  deleteInstansiController,
} from "@/core/controllers/instansi-master.controller.js";

const instansiRouter = Router();

// Tambahkan verifyToken di tengah jika diperlukan, contoh: router.get("/", verifyToken, instansiController.getAll);
instansiRouter.get("/getAllInstansi", getAllInstansiController);
instansiRouter.get("/getInstansiById/:id", authenticate, authorize(["ADMIN"]), getInstansiByIdController);
instansiRouter.post("/createInstansi", authenticate, authorize(["ADMIN"]), createInstansiController);
instansiRouter.put("/updateInstansi/:id", authenticate, authorize(["ADMIN"]), updateInstansiController);
instansiRouter.delete("/deleteInstansi/:id", authenticate, authorize(["ADMIN"]), deleteInstansiController);

export default instansiRouter;