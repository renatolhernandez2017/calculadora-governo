#!/bin/bash
set -e

mkdir -p /run/nginx

echo ""
echo "===== INICIANDO NGINX ====="
nginx

echo ""
echo "===== INICIANDO API REGIME GERAL ====="

java \
  -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline \
  --spring.datasource.url="jdbc:sqlite:file:/calculadora/db/calculadora-pro.db?mode=ro&date_class=TEXT&date_string_format=yyyy-MM-dd" \
  >/tmp/regime.log 2>&1 &

PID1=$!

echo ""
echo "===== INICIANDO API SPLIT PAYMENT ====="

java \
  -jar /calculadora/api-split-payment-simplificado.jar \
  --spring.profiles.active=offline \
  --spring.datasource.url="jdbc:sqlite:file:/calculadora/db/split.db?date_class=TEXT&date_string_format=yyyy-MM-dd" \
  >/tmp/split.log 2>&1 &

PID2=$!

echo ""
echo "===== AGUARDANDO APIs ====="

for i in $(seq 1 600); do

  if ! kill -0 $PID1 2>/dev/null; then
    echo ""
    echo "===== API REGIME GERAL ENCERRADA ====="
    cat /tmp/regime.log
    exit 1
  fi

  if ! kill -0 $PID2 2>/dev/null; then
    echo ""
    echo "===== API SPLIT PAYMENT ENCERRADA ====="
    cat /tmp/split.log
    exit 1
  fi

  REGIME=$(curl -s http://localhost:9101/health 2>/dev/null || true)
  SPLIT=$(curl -s http://localhost:9102/health 2>/dev/null || true)

  if echo "$REGIME" | grep -q "UP" && echo "$SPLIT" | grep -q "UP"; then
    echo ""
    echo "===== SISTEMA PRONTO ====="
    break
  fi

  echo "Aguardando inicialização... ($i/600)"
  sleep 2
done

echo ""
echo "===== LOG REGIME ====="
tail -50 /tmp/regime.log || true

echo ""
echo "===== LOG SPLIT ====="
tail -50 /tmp/split.log || true

wait $PID1 $PID2
