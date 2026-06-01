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
echo "Testando conectividade da API..."
echo "(Exibindo log da aplicação em tempo real...)"
echo ""

# Health check com retry e tail do log
max_attempts=30
attempt=0

# Inicia tail do log em background
tail -f /tmp/api.log 2>/dev/null &
TAIL_PID=$!

while [ $attempt -lt $max_attempts ]; do
  attempt=$((attempt + 1))
  
  health=$(curl -s --max-time 2 http://127.0.0.1:3000/health 2>/dev/null || echo "")
  
  if echo "$health" | grep -q "UP"; then
    echo ""
    echo "✓ API está UP e respondendo!"
    kill $TAIL_PID 2>/dev/null || true
    break
  fi
  
  echo "[$attempt/$max_attempts] Testando health check..."
  sleep 3
done

if [ $attempt -eq $max_attempts ]; then
  echo ""
  echo "❌ Timeout! API não respondeu ao health check após $((max_attempts * 3)) segundos"
  kill $TAIL_PID 2>/dev/null || true
  echo ""
  echo "========== Log da aplicação =========="
  cat /tmp/api.log
  echo "======================================"
  exit 1
fi

echo ""
echo "Aguardando encerramento do serviço..."
wait $PID1
