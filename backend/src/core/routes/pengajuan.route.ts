import { Router } from "express";
import { authenticate, authorize } from "@/middlewares/auth.middleware.js";
import { createPengajuanController, getDetailPengajuanAdmin, getListPengajuanAdmin, updatePengajuanAdmin, uploadDokumenAdmin } from "../controllers/pengajuan.controller.js";
import { uploadBerkasPendukung } from "../../middlewares/upload.middleware.js";
import { getDashboardAnalytics } from "../controllers/pengajuanAdmin.controller.js";

const pengajuanRoute = Router();

// public api
pengajuanRoute.post("/createPengajuan", uploadBerkasPendukung, createPengajuanController);

// private admin/CS api

pengajuanRoute.get("/dashboardAnalytics", authenticate, authorize(["ADMIN", "CS"]), getDashboardAnalytics);
pengajuanRoute.get("/listPengajuanAdmin", authenticate, authorize(["ADMIN", "CS"]), getListPengajuanAdmin);
pengajuanRoute.get("/detailPengajuanAdmin/:id", authenticate, authorize(["ADMIN", "CS"]), getDetailPengajuanAdmin);
pengajuanRoute.put("/updatePengajuanAdmin/:id", authenticate, authorize(["ADMIN", "CS"]), updatePengajuanAdmin);
pengajuanRoute.put("/uploadBerkasPendukung/:id", authenticate, authorize(["ADMIN", "CS"]), uploadBerkasPendukung, uploadDokumenAdmin);

export default pengajuanRoute;
