export async function getParents() {
  const res = await fetch('/api/parents');
  if (!res.ok) throw new Error('Error al obtener padres');
  return res.json();
}

export async function createParent(data) {
  const res = await fetch('/api/parents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear padre');
  return res.json();
} 