#!/bin/bash
set -e

echo "Iniciando Calculadora de Tributos..."

mkdir -p /run/nginx

nginx

# Bug corrigido 1: salvar o PID após iniciar em background (&)
java -jar /calculadora/api-regime-geral.jar \
  --spring.profiles.active=offline \
  >/tmp/regime.log 2>&1 &
PID1=$!

# Bug corrigido 2: era api-regime-geral.jar (cópia errada) — deve ser api-split-payment-simplificado.jar
java -jar /calculadora/api-split-payment-simplificado.jar \
  --spring.profiles.active=offline \
  >/tmp/split.log 2>&1 &
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

# Bug corrigido 3: wait usa as variáveis corretas ($PID1 e $PID2)
wait $PID1 $PID2
