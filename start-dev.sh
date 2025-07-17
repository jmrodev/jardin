#!/bin/bash

# --- 1. Liberar puertos conocidos ---
PORTS_TO_CLEAR=(3000 5173) # 3000 para backend, 5173 es el puerto por defecto de Vite
echo "Verificando y liberando puertos..."
for PORT in "${PORTS_TO_CLEAR[@]}"; do
  # Usamos lsof para encontrar el PID del proceso que usa el puerto.
  # La opción -t devuelve solo el PID, y redirigimos el error para que no muestre nada si no encuentra un proceso.
  PID=$(sudo lsof -t -i:$PORT 2>/dev/null)
  if [ -n "$PID" ]; then
    echo "El puerto $PORT está en uso por el proceso con PID $PID. Deteniéndolo..."
    sudo kill -9 "$PID"
    echo "Proceso detenido."
  else
    echo "El puerto $PORT está libre."
  fi
done
echo "Puertos verificados."
sleep 2
echo ""

# --- 2. Verificar e iniciar servicios del sistema ---
SERVICES_TO_CHECK=(httpd mariadb)
echo "Verificando el estado de los servicios del sistema..."
for SERVICE in "${SERVICES_TO_CHECK[@]}"; do
  if systemctl is-active --quiet "$SERVICE"; then
    echo "El servicio $SERVICE ya está en ejecución."
  else
    echo "Iniciando el servicio $SERVICE..."
    sudo systemctl start "$SERVICE"
    if ! systemctl is-active --quiet "$SERVICE"; then
      echo "Error: No se pudo iniciar el servicio $SERVICE." >&2
      exit 1
    fi
    echo "Servicio $SERVICE iniciado correctamente."
  fi
done
echo "Servicios del sistema listos."
sleep 2
echo ""

# --- 3. Crear scripts temporales (sin el comando 'read' para que se cierren al ser 'killed') ---
BACKEND_SCRIPT=$(mktemp /tmp/start-backend.XXXXXX.sh)
cat > "$BACKEND_SCRIPT" << 'EOF'
#!/bin/zsh
echo 'Iniciando servidor de desarrollo del backend...'
echo "Cambiando al directorio $(pwd)/backend"
cd "$(pwd)/backend"
npm run dev
EOF
chmod +x "$BACKEND_SCRIPT"

FRONTEND_SCRIPT=$(mktemp /tmp/start-frontend.XXXXXX.sh)
cat > "$FRONTEND_SCRIPT" << 'EOF'
#!/bin/zsh
echo 'Iniciando servidor de desarrollo del frontend...'
cd "$(pwd)/frontend"
npm run dev
# --- AÑADIDO PARA DEPURACIÓN ---
# Esta pausa mantendrá la terminal abierta incluso si 'npm run dev' falla,
# permitiéndonos ver cualquier mensaje de error.
echo -e "\n\n--- El servidor se ha detenido o no ha podido iniciarse. Presiona una tecla para cerrar. ---"
read -n 1 -s -r
EOF
chmod +x "$FRONTEND_SCRIPT"

# --- 4. Configurar limpieza y lanzar terminales ---
cleanup() {
    echo -e "\n\nCerrando todos los procesos y terminales..."
    # Matar las terminales usando el nombre del script que están ejecutando.
    pkill -f "$BACKEND_SCRIPT"
    pkill -f "$FRONTEND_SCRIPT"
    sleep 1

    # Detener servicios del sistema que el script podría haber iniciado
    echo "Deteniendo servicios del sistema (httpd y mariadb)..."
    sudo systemctl stop httpd
    sudo systemctl stop mariadb
    echo "Servicios detenidos."
    sleep 1

    # Eliminar los scripts temporales
    rm -f "$BACKEND_SCRIPT" "$FRONTEND_SCRIPT"
    echo "Limpieza completa."
    # Forzar la salida del script principal
    exit 0
}
# La trampa ahora se activa al salir del script o al recibir una interrupción (Ctrl+C)
trap cleanup EXIT INT TERM

# Iniciar terminales en segundo plano
echo "Abriendo terminal para el backend..."
xfce4-terminal --title="Jardin Backend" --command="$BACKEND_SCRIPT" &

echo "Abriendo terminal para el frontend..."
xfce4-terminal --title="Jardin Frontend" --command="$FRONTEND_SCRIPT" &

echo ""
echo "¡Entorno de desarrollo listo!"
echo "==> Presiona [CTRL+C] en ESTA terminal para detener los servidores y cerrar sus ventanas. <=="

# El script principal espera aquí de forma indefinida.
# Cuando presionas Ctrl+C, el 'trap' se ejecuta y el script termina.
while true; do
    sleep 1
done 