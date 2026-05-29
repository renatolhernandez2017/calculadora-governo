#!/bin/bash
set -e

echo "Iniciando Calculadora de Tributos..."

profile="offline"

mkdir -p /run/nginx

nginx

java -jar /calculadora/api-regime-geral.jar --spring.profiles.active=${profile} >/tmp/regime.log 2>&1 &
PID1=$!

java -jar /calculadora/api-split-payment-simplificado.jar --spring.profiles.active=local >/tmp/split.log 2>&1 &
PID2=$!

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
