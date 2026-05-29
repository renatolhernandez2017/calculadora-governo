#!/bin/bash
set -e

echo "Iniciando Calculadora de Tributos..."

profile="offline"

mkdir -p /run/nginx

nginx

echo "PWD:"
pwd

echo "DBS:"
find / -name "*.db" 2>/dev/null

echo "JARS:"
find / -name "*.jar" 2>/dev/null

java -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline &

java -jar /calculadora/api-split-payment-simplificado.jar \
  --spring.profiles.active=local &

echo "Aguardando APIs..."

for i in $(seq 1 120); do
  health1=$(curl -s http://localhost:9101/health || true)
  health2=$(curl -s http://localhost:9102/health || true)

  if echo "$health1" | grep -q "UP" && echo "$health2" | grep -q "UP"; then
    echo "APIs disponíveis."
    break
  fi

  sleep 2
done

wait $PID1 $PID2
