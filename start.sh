#!/bin/bash
set -e

echo "Iniciando Calculadora de Tributos..."

mkdir -p /run/nginx

# Inicia Nginx
nginx

# Inicia API na porta 3000
echo "Iniciando API (regime-geral) na porta 3000..."
java -Dserver.port=3000 -Dserver.address=0.0.0.0 -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline \
  >/tmp/api.log 2>&1 &
PID1=$!
echo "PID1=$PID1 (porta 3000)"

# Aguarda inicialização
sleep 5

# Verifica se ainda está rodando
if ! kill -0 $PID1 2>/dev/null; then
  echo "❌ ERRO: API falhou ao iniciar!"
  echo "========== Últimos 100 linhas do log =========="
  tail -100 /tmp/api.log
  echo "=============================================="
  exit 1
fi

echo "✓ Processo Java está rodando (PID: $PID1)"
echo ""
echo "Aguardando inicialização completa da aplicação..."
echo "(Monitorando logs...)"
echo ""

# Aguarda padrão específico no log que indica app pronto
timeout=120
elapsed=0
while [ $elapsed -lt $timeout ]; do
  if grep -q "Tomcat started on port\|Application started\|Started CalculadoraTributoApplication" /tmp/api.log 2>/dev/null; then
    echo "✓ Aplicação detectada como pronta!"
    break
  fi
  
  echo "[$elapsed/$timeout] Aguardando inicialização..."
  sleep 2
  elapsed=$((elapsed + 2))
done

# Mostra últimas linhas do log
echo ""
echo "Últimas linhas do log:"
tail -20 /tmp/api.log
echo ""

# Agora faz health check
echo "Testando health endpoint..."
max_attempts=20
attempt=0

while [ $attempt -lt $max_attempts ]; do
  attempt=$((attempt + 1))
  
  health=$(curl -s --max-time 2 http://127.0.0.1:3000/health 2>/dev/null || echo "")
  
  if echo "$health" | grep -q "UP"; then
    echo "✓ Health check retornou UP!"
    break
  fi
  
  echo "[$attempt/$max_attempts] Health check ainda não respondeu..."
  sleep 2
done

if ! echo "$health" | grep -q "UP"; then
  echo ""
  echo "❌ ERRO: Aplicação não respondeu ao health check"
  echo "Health response: $health"
  exit 1
fi

echo ""
echo "Aguardando encerramento do serviço..."
wait $PID1
