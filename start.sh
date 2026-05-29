#!/bin/bash
set -e

mkdir -p /run/nginx

echo ""
echo "===== INICIANDO API REGIME GERAL ====="

java -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline
PID1=$!

echo ""
echo "===== INICIANDO API SPLIT PAYMENT ====="

java -jar /calculadora/api-split-payment-simplificado.jar \
  --spring.profiles.active=offline
PID2=$!

echo ""
echo "===== AGUARDANDO APIs ====="

for i in $(seq 1 30); do
  if ! kill -0 $PID1 2>/dev/null; then
    echo ""
    echo "API REGIME GERAL ENCERRADA"
    echo "========== REGIME LOG =========="
    cat /tmp/regime.log || true
    exit 1
  fi

  if ! kill -0 $PID2 2>/dev/null; then
    echo ""
    echo "API SPLIT PAYMENT ENCERRADA"
    echo "========== SPLIT LOG =========="
    cat /tmp/split.log || true
    exit 1
  fi

  if curl -sf http://localhost:8080/api >/dev/null 2>&1; then
    echo "Regime Geral disponível"
    break
  fi

  echo "Aguardando inicialização... ($i/120)"
  sleep 1
done

echo ""
echo "===== LOG REGIME ====="
tail -100 /tmp/regime.log || true

echo ""
echo "===== LOG SPLIT ====="
tail -100 /tmp/split.log || true

echo ""
echo "===== SISTEMA PRONTO ====="

wait $PID1 $PID2
