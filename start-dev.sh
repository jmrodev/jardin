#!/bin/bash

# Iniciar servicios del sistema con sudo
echo "Iniciando servicios (httpd y mariadb)..."
sudo systemctl start httpd
sudo systemctl start mariadb

# Comprobar si los servicios se han iniciado correctamente
if ! systemctl is-active --quiet httpd || ! systemctl is-active --quiet mariadb; then
    echo "Error: Uno o más servicios (httpd, mariadb) no pudieron iniciarse." >&2
    exit 1
fi
echo "Servicios iniciados correctamente."

# Iniciar el servidor de backend en segundo plano
echo "Iniciando el servidor de desarrollo del backend..."
cd backend
npm run dev &
cd ..

# Iniciar el servidor de frontend en segundo plano
echo "Iniciando el servidor de desarrollo del frontend..."
cd frontend
npm run dev &
cd ..

echo ""
echo "¡Entorno de desarrollo listo!"
echo "El frontend y el backend se están ejecutando en segundo plano." 