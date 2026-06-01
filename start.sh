#!/bin/bash
set -e

echo "Iniciando Calculadora de Tributos..."

profile="offline"

mkdir -p /run/nginx

nginx

# Inicia primeira API na porta 9101 (ou 8080 se esperado pelo nginx)
java -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline \
  --server.port=8080 \
  >/tmp/regime.log 2>&1 &
PID1=$!

# Inicia segunda API na porta 9102 (ou 8081 se esperado pelo nginx)
java -jar /calculadora/api-split-payment-simplificado.jar \
  --spring.profiles.active=offline \
  --server.port=8081 \
  >/tmp/split-payment.log 2>&1 &
PID2=$!

echo "Aguardando APIs..."
echo "PID1=$PID1 (porta 8080)"
echo "PID2=$PID2 (porta 8081)"

for i in $(seq 1 120); do
  health1=$(curl -s http://localhost:8080/health || true)
  health2=$(curl -s http://localhost:8081/health || true)

  if echo "$health1" | grep -q "UP" && echo "$health2" | grep -q "UP"; then
    echo "APIs disponíveis."
    break
  fi

  sleep 2
done

wait $PID1 $PID2
