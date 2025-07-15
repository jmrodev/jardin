export async function getStudents() {
  const res = await fetch('/api/students');
  if (!res.ok) throw new Error('Error al obtener estudiantes');
  return res.json();
}

export async function createStudent(data) {
  const res = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear estudiante');
  return res.json();
}

export async function updateStudent(id, data) {
  const res = await fetch(`/api/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar estudiante');
  return res.json();
}

export async function deleteStudent(id) {
  const res = await fetch(`/api/students/${id}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar estudiante');
  return res.json();
} 