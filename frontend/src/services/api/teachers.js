export async function getTeachers() {
  const res = await fetch('/api/teachers');
  if (!res.ok) throw new Error('Error al obtener maestros');
  return res.json();
}

export async function createTeacher(data) {
  const res = await fetch('/api/teachers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear maestro');
  return res.json();
}

export async function updateTeacher(id, data) {
  const res = await fetch(`/api/teachers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar maestro');
  return res.json();
}

export async function deleteTeacher(id) {
  const res = await fetch(`/api/teachers/${id}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar maestro');
  return res.json();
} 