#!/bin/bash
set -e

echo "Iniciando Calculadora de Tributos..."

mkdir -p /run/nginx

# Inicia Nginx
nginx

# Tenta inicia primeira API com port binding
echo "Iniciando API 1 (regime-geral)..."
java -Dserver.port=8080 -Dserver.address=0.0.0.0 -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline \
  >/tmp/regime.log 2>&1 &
PID1=$!
echo "PID1=$PID1 (porta 8080)"

# Aguarda um pouco
sleep 3

# Verifica se ainda está rodando
if ! kill -0 $PID1 2>/dev/null; then
  echo "ERRO: API 1 falhou. Log:"
  tail -50 /tmp/regime.log
  exit 1
fi

echo "Verificando se porta 8080 está listening..."
sleep 2
if ss -tlnp 2>/dev/null | grep -q :8080; then
  echo "✓ Porta 8080 está listening"
else
  echo "⚠ Porta 8080 NÃO está listening. Ports listening:"
  ss -tlnp || netstat -tlnp || echo "Nenhuma ferramenta disponível"
fi

# Tenta inicia segunda API
echo "Iniciando API 2 (split-payment)..."
java -Dserver.port=8081 -Dserver.address=0.0.0.0 -jar /calculadora/api-split-payment-simplificado.jar \
  --spring.profiles.active=offline \
  >/tmp/split-payment.log 2>&1 &
PID2=$!
echo "PID2=$PID2 (porta 8081)"

# Aguarda um pouco
sleep 3

# Verifica se ainda está rodando
if ! kill -0 $PID2 2>/dev/null; then
  echo "ERRO: API 2 falhou. Log:"
  tail -50 /tmp/split-payment.log
  exit 1
fi

echo "Verificando se porta 8081 está listening..."
sleep 2
if ss -tlnp 2>/dev/null | grep -q :8081; then
  echo "✓ Porta 8081 está listening"
else
  echo "⚠ Porta 8081 NÃO está listening. Ports listening:"
  ss -tlnp || netstat -tlnp || echo "Nenhuma ferramenta disponível"
fi

echo "Aguardando APIs ficar prontas..."

# Health check com retry
for i in $(seq 1 60); do
  health1=$(curl -s --max-time 2 http://localhost:8080/health 2>/dev/null || echo "")
  health2=$(curl -s --max-time 2 http://localhost:8081/health 2>/dev/null || echo "")

  api1_status=$(echo "$health1" | grep -o 'UP\|DOWN' || echo "WAITING")
  api2_status=$(echo "$health2" | grep -o 'UP\|DOWN' || echo "WAITING")

  echo "[$i/60] API1=$api1_status API2=$api2_status"

  if echo "$health1" | grep -q "UP" && echo "$health2" | grep -q "UP"; then
    echo "✓ Todas as APIs estão prontas!"
    break
  fi

  sleep 2
done

# Se chegou até aqui, APIs estão (pelo menos parcialmente) rodando
echo "Aguardando encerramento..."
wait $PID1 $PID2
