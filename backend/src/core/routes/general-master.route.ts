import { Router } from "express";
import * as masterController from "../controllers/general-master.controller.js";
import { authenticate, authorize } from "@/middlewares/auth.middleware.js";
// Opsional: Import middleware verifyToken milik Anda jika sudah ada
// import { verifyToken } from "@/middlewares/auth.middleware.js"; 

const masterRouter = Router();

// Tambahkan verifyToken di tengah jika Anda ingin rute ini diproteksi (hanya admin)
// Contoh: router.get("/:kategori", verifyToken, masterController.getAll);

masterRouter.get("/:kategori", masterController.getAll);
masterRouter.post("/:kategori", authenticate, authorize(["ADMIN"]), masterController.create);
masterRouter.put("/:kategori/:id", authenticate, authorize(["ADMIN"]), masterController.update);
masterRouter.delete("/:kategori/:id", authenticate, authorize(["ADMIN"]), masterController.remove);

export default masterRouter;