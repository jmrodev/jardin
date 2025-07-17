import { getConnection } from '../config/database.js';

/**
 * Middleware para capturar información de auditoría
 * Agrega req.auditInfo con información del usuario y request
 */
export const auditMiddleware = (req, res, next) => {
  // Extraer información del usuario del token JWT
  const user = req.user; // Asumiendo que el middleware de auth ya estableció req.user
  
  // Capturar información del request
  req.auditInfo = {
    userId: user?.id || null,
    ipAddress: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    timestamp: new Date()
  };
  
  next();
};

/**
 * Función helper para obtener el ID del usuario actual
 */
export const getCurrentUserId = (req) => {
  return req.user?.id || req.auditInfo?.userId || null;
};

/**
 * Función helper para agregar información de auditoría a una consulta
 */
export const addAuditFields = (data, req, isUpdate = false) => {
  const userId = getCurrentUserId(req);
  
  if (isUpdate) {
    return {
      ...data,
      updated_by: userId,
      updated_at: new Date()
    };
  } else {
    return {
      ...data,
      created_by: userId,
      updated_by: userId,
      created_at: new Date(),
      updated_at: new Date()
    };
  }
};

/**
 * Función para registrar cambios en audit_log manualmente
 */
export const logAuditEvent = async (req, tableName, recordId, action, oldValues = null, newValues = null) => {
  try {
    const pool = getConnection();
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      console.warn('No se pudo obtener el ID del usuario para auditoría');
      return;
    }
    
    const [result] = await pool.execute(
      'INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        tableName,
        recordId,
        action,
        oldValues ? JSON.stringify(oldValues) : null,
        newValues ? JSON.stringify(newValues) : null,
        userId,
        req.auditInfo?.ipAddress || null,
        req.auditInfo?.userAgent || null
      ]
    );
    
    return result.insertId;
  } catch (error) {
    console.error('Error al registrar evento de auditoría:', error);
  }
};

/**
 * Función para obtener el historial de auditoría de un registro
 */
export const getAuditHistory = async (tableName, recordId) => {
  try {
    const pool = getConnection();
    const [rows] = await pool.execute(
      `SELECT 
        al.id,
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
      WHERE al.table_name = ? AND al.record_id = ?
      ORDER BY al.changed_at DESC`,
      [tableName, recordId]
    );
    
    return rows;
  } catch (error) {
    console.error('Error al obtener historial de auditoría:', error);
    throw error;
  }
};

/**
 * Función para obtener estadísticas de auditoría
 */
export const getAuditStats = async (tableName = null, userId = null, dateFrom = null, dateTo = null) => {
  try {
    const pool = getConnection();
    let query = `
      SELECT 
        al.action,
        COUNT(*) as count,
        DATE(al.changed_at) as date
      FROM audit_log al
      WHERE 1=1
    `;
    
    const params = [];
    
    if (tableName) {
      query += ' AND al.table_name = ?';
      params.push(tableName);
    }
    
    if (userId) {
      query += ' AND al.changed_by = ?';
      params.push(userId);
    }
    
    if (dateFrom) {
      query += ' AND DATE(al.changed_at) >= ?';
      params.push(dateFrom);
    }
    
    if (dateTo) {
      query += ' AND DATE(al.changed_at) <= ?';
      params.push(dateTo);
    }
    
    query += ' GROUP BY al.action, DATE(al.changed_at) ORDER BY date DESC, al.action';
    
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Error al obtener estadísticas de auditoría:', error);
    throw error;
  }
}; 