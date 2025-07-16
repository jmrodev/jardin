import React from 'react';
import { useTranslation } from 'react-i18next';
import formatDate from '../../utils/formatDate';

export default function StudentDetail({ student }) {
  if (!student) return <div>No hay datos del estudiante.</div>;
  return (
    <div>
      <h2>Detalle de estudiante</h2>
      <p><b>Nombre:</b> {student.firstname} {student.lastname_father} {student.lastname_mother}</p>
      <h3>Responsables</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Relación</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>¿Puede retirar?</th>
            <th>¿Puede cambiar pañales?</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          {student.responsibles && student.responsibles.map(r => (
            <tr key={r.id}>
              <td>{r.name} {r.lastname}</td>
              <td>{r.type}</td>
              <td>{r.dni}</td>
              <td>{r.phone}</td>
              <td>{r.can_pickup ? 'Sí' : 'No'}</td>
              <td>{r.can_change_diapers ? 'Sí' : 'No'}</td>
              <td>{r.notes || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 