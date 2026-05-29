#!/bin/bash
set -e

mkdir -p /run/nginx

echo ""
echo "===== INICIANDO NGINX ====="
nginx

echo ""
echo "===== APPLICATION-OFFLINE ====="
unzip -p /calculadora/api-regime-geral.jar BOOT-INF/classes/application-offline.yml || true

echo ""
echo "===== BANCOS ====="
ls -lah /calculadora/db || true

echo ""
echo "===== INICIANDO API REGIME GERAL ====="

java \
  -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline \
  >/tmp/regime.log 2>&1 &

PID1=$!

echo ""
echo "===== INICIANDO API SPLIT PAYMENT ====="

java \
  -jar /calculadora/api-split-payment-simplificado.jar \
  --spring.profiles.active=offline \
  >/tmp/split.log 2>&1 &

PID2=$!

echo ""
echo "===== AGUARDANDO APIs ====="

for i in $(seq 1 120); do

  if ! kill -0 $PID1 2>/dev/null; then
    echo ""
    echo "===== API REGIME GERAL ENCERRADA ====="
    cat /tmp/regime.log || true
    exit 1
  fi

  if ! kill -0 $PID2 2>/dev/null; then
    echo ""
    echo "===== API SPLIT PAYMENT ENCERRADA ====="
    cat /tmp/split.log || true
    exit 1
  fi

  echo ""
  echo "===== STATUS ($i/120) ====="

  echo "--- PORTA 8080 ---"
  curl -I http://localhost:8080 2>/dev/null || true

  echo "--- PORTA 8081 ---"
  curl -I http://localhost:8081 2>/dev/null || true

  echo "--- REGIME LOG ---"
  tail -20 /tmp/regime.log || true

  echo "--- SPLIT LOG ---"
  tail -20 /tmp/split.log || true

  sleep 2
done

echo ""
echo "===== SISTEMA PRONTO ====="

wait $PID1 $PID2
