#!/bin/bash
set -e

echo "========================================="
echo "Iniciando Calculadora de Tributos"
echo "========================================="

mkdir -p /run/nginx

echo "Estrutura de arquivos:"
find /calculadora -type f | sort

echo ""
echo "Bancos encontrados:"
find /calculadora -name "*.db" -type f

echo ""
echo "Iniciando nginx..."
nginx

echo ""
echo "Iniciando API Regime Geral..."

java \
  -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline \
  >/tmp/regime.log 2>&1 &

PID1=$!

echo ""
echo "Iniciando API Split Payment..."

java \
  -jar /calculadora/api-split-payment-simplificado.jar \
  --spring.datasource.url=jdbc:sqlite:file:/calculadora/db/split.db \
  >/tmp/split.log 2>&1 &

PID2=$!

sleep 15

echo ""
echo "================ REGIME LOG ================"
cat /tmp/regime.log || true

echo ""
echo "================ SPLIT LOG ================="
cat /tmp/split.log || true

echo ""
echo "================ PORTAS ===================="
netstat -tulpn || true

echo ""
echo "================ HEALTH ===================="

for i in $(seq 1 120)
do
    if ! kill -0 $PID1 2>/dev/null; then
        echo ""
        echo "API REGIME GERAL MORREU"
        cat /tmp/regime.log
        exit 1
    fi

    if ! kill -0 $PID2 2>/dev/null; then
        echo ""
        echo "API SPLIT PAYMENT MORREU"
        cat /tmp/split.log
        exit 1
    fi

    curl -s http://localhost:9101/health || true
    echo ""

    curl -s http://localhost:9102/health || true
    echo ""

    if curl -sf http://localhost:9101/health >/dev/null &&
       curl -sf http://localhost:9102/health >/dev/null
    then
        echo "APIs prontas."
        break
    fi

    sleep 2
done

wait $PID1 $PID2
