import { pengajuanAdminService } from '../services/pengajuanAdmin.service.js';
import type { Request, Response } from 'express';

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    const summary = await pengajuanAdminService.getDashboardSummary();
    return res.status(200).json({
      message: 'Berhasil memuat data analitik dashboard',
      data: summary
    });
  } catch (error) {
    console.error('Error Dashboard Analytics:', error);
    return res.status(500).json({ error: 'Gagal memuat data ringkasan dashboard.' });
  }
};