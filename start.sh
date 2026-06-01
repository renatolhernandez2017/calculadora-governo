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
echo "Aguardando inicialização completa da aplicação..."
echo "(Monitorando logs...)"
echo ""

# Aguarda padrão específico no log que indica app pronta
# Procura por indicadores de que a inicialização terminou
timeout=120
elapsed=0
while [ $elapsed -lt $timeout ]; do
  # Verifica se a aplicação terminou de inicializar (Hibernate configurado)
  if grep -q "Initialized JPA EntityManagerFactory\|Application started in\|Tomcat started" /tmp/api.log 2>/dev/null; then
    echo "✓ Aplicação inicializada!"
    # Aguarda mais um pouco para garantir que está 100% pronta
    sleep 10
    break
  fi
  
  echo "[$elapsed/$timeout] Aguardando inicialização..."
  sleep 2
  elapsed=$((elapsed + 2))
done

# Mostra últimas linhas do log
echo ""
echo "Últimas linhas do log:"
tail -20 /tmp/api.log
echo ""

# Tenta acessar qualquer endpoint (não dependemos de /health)
echo "Testando conectividade da API..."
max_attempts=10
attempt=0

while [ $attempt -lt $max_attempts ]; do
  attempt=$((attempt + 1))
  
  # Tenta acessar um endpoint que deve existir
  response=$(curl -s --max-time 3 http://127.0.0.1:3000/api/calculadora/dados-abertos/ufs 2>/dev/null || echo "")
  
  # Se conseguiu resposta (mesmo que erro), significa que a app está respondendo
  if [ -n "$response" ]; then
    echo "✓ Aplicação está respondendo em http://127.0.0.1:3000/api!"
    break
  fi
  
  echo "[$attempt/$max_attempts] Testando conectividade..."
  sleep 2
done

echo "✓ Pronto para receber requisições!"

echo ""
echo "Aguardando encerramento do serviço..."
wait $PID1
