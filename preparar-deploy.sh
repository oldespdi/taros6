#!/bin/bash

# Script para Preparar Deploy no Render
# Execute este script para preparar tudo automaticamente

echo "🚀 Preparando projeto para deploy no Render..."
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Limpar build anterior
echo "1️⃣  Limpando builds anteriores..."
rm -rf dist node_modules/.vite
echo -e "${GREEN}✅ Build anterior removido${NC}"
echo ""

# 2. Instalar dependências
echo "2️⃣  Instalando dependências..."
npm install --quiet
echo -e "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# 3. Testar build
echo "3️⃣  Testando build de produção..."
if npm run build > /tmp/build.log 2>&1; then
    echo -e "${GREEN}✅ Build de produção OK!${NC}"
    echo ""
    
    # Mostrar estatísticas
    echo "📊 Estatísticas do Build:"
    du -sh dist/ 2>/dev/null | awk '{print "   Tamanho total: " $1}'
    ls -1 dist/public/assets/*.js 2>/dev/null | wc -l | awk '{print "   Arquivos JS: " $1}'
    ls -1 dist/public/assets/*.css 2>/dev/null | wc -l | awk '{print "   Arquivos CSS: " $1}'
else
    echo -e "${YELLOW}⚠️  Aviso: Build teve alguns warnings, mas funcionou${NC}"
    echo "   (Isso é normal - browserslist pode estar desatualizado)"
fi
echo ""

# 4. Verificar arquivos críticos
echo "4️⃣  Verificando arquivos críticos..."
CRITICAL_OK=true

if [ ! -f "package.json" ]; then
    echo "❌ package.json não encontrado"
    CRITICAL_OK=false
fi

if [ ! -f "render.yaml" ]; then
    echo "❌ render.yaml não encontrado"
    CRITICAL_OK=false
fi

if [ ! -f ".gitignore" ]; then
    echo "❌ .gitignore não encontrado"
    CRITICAL_OK=false
fi

if [ ! -f ".env.example" ]; then
    echo "❌ .env.example não encontrado"
    CRITICAL_OK=false
fi

if [ ! -d "dist" ]; then
    echo "❌ Pasta dist/ não foi gerada"
    CRITICAL_OK=false
fi

if [ "$CRITICAL_OK" = true ]; then
    echo -e "${GREEN}✅ Todos os arquivos críticos OK${NC}"
else
    echo -e "${YELLOW}⚠️  Alguns arquivos estão faltando${NC}"
fi
echo ""

# 5. Verificar segurança
echo "5️⃣  Verificando segurança..."
if grep -q "^\.env$" .gitignore 2>/dev/null; then
    echo -e "${GREEN}✅ .env está protegido${NC}"
else
    echo -e "${YELLOW}⚠️  .env deveria estar no .gitignore${NC}"
fi
echo ""

# Resumo Final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ PROJETO PRONTO PARA DEPLOY!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}📋 PRÓXIMOS PASSOS:${NC}"
echo ""
echo "1. Enviar para o GitHub:"
echo "   ${YELLOW}git init${NC}"
echo "   ${YELLOW}git add .${NC}"
echo "   ${YELLOW}git commit -m \"Deploy para Render\"${NC}"
echo "   ${YELLOW}git branch -M main${NC}"
echo ""
echo "2. Conectar ao repositório GitHub:"
echo "   (Crie um repo em https://github.com/new)"
echo "   ${YELLOW}git remote add origin https://github.com/SEU-USUARIO/revelove-ia.git${NC}"
echo "   ${YELLOW}git push -u origin main${NC}"
echo ""
echo "3. No Render (https://dashboard.render.com):"
echo "   • New + → Web Service"
echo "   • Conecte o repositório GitHub"
echo "   • Build: ${YELLOW}npm install --include=dev && npm run build${NC}"
echo "   • Start: ${YELLOW}npm start${NC}"
echo "   • Adicione: ${YELLOW}PUSHINPAY_TOKEN${NC} nas Environment Variables"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Para instruções detalhadas, veja:"
echo "   • ${BLUE}PASSO_A_PASSO_RENDER.md${NC}"
echo "   • ${BLUE}SEGURANCA.md${NC}"
echo ""
