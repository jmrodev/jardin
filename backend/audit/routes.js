import express from 'express';
import { getConnection } from '../config/database.js';
import { getAuditHistory, getAuditStats } from '../middleware/auditMiddleware.js';
import { authorizeRoles } from '../auth/authorizeRoles.js';

const router = express.Router();

// Obtener historial de auditoría de un registro específico
router.get('/history/:table/:id', authorizeRoles(['admin', 'director']), async (req, res) => {
  try {
    const { table, id } = req.params;
    const history = await getAuditHistory(table, id);
    
    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('Error al obtener historial de auditoría:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Obtener estadísticas de auditoría
router.get('/stats', authorizeRoles(['admin', 'director']), async (req, res) => {
  try {
    const { table, userId, dateFrom, dateTo } = req.query;
    const stats = await getAuditStats(table, userId, dateFrom, dateTo);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error al obtener estadísticas de auditoría:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Obtener historial de auditoría con filtros
router.get('/logs', authorizeRoles(['admin', 'director']), async (req, res) => {
  try {
    const { table, recordId, action, userId, limit = 50, offset = 0 } = req.query;
    
    const pool = getConnection();
    let query = `
      SELECT 
        al.id,
        al.table_name,
        al.record_id,
        al.action,
        al.old_values,
        al.new_values,
        al.changed_at,
        al.ip_address,
        al.user_agent,
        CONCAT(s.name, ' ', s.lastname) as changed_by_name,
        s.role as changed_by_role,
        s.username as changed_by_username
      FROM audit_log al
      JOIN staff s ON al.changed_by = s.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (table) {
      query += ' AND al.table_name = ?';
      params.push(table);
    }
    
    if (recordId) {
      query += ' AND al.record_id = ?';
      params.push(recordId);
    }
    
    if (action) {
      query += ' AND al.action = ?';
      params.push(action);
    }
    
    if (userId) {
      query += ' AND al.changed_by = ?';
      params.push(userId);
    }
    
    query += ' ORDER BY al.changed_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const [rows] = await pool.execute(query, params);
    
    res.json({
      success: true,
      data: rows,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: rows.length
      }
    });
  } catch (error) {
    console.error('Error al obtener logs de auditoría:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

export default router; 