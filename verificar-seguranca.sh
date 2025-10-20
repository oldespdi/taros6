#!/bin/bash

# Script de Verificação de Segurança
# Execute antes de fazer commit no Git

echo "🔍 Verificando Segurança do Projeto..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# 1. Verificar se .env está no .gitignore
echo "1️⃣  Verificando .gitignore..."
if grep -q "^\.env$" .gitignore 2>/dev/null; then
    echo -e "${GREEN}✅ .env está protegido no .gitignore${NC}"
else
    echo -e "${RED}❌ ERRO: .env NÃO está no .gitignore!${NC}"
    echo "   Adicione '.env' ao arquivo .gitignore"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Verificar se existe .env no stage do Git
echo "2️⃣  Verificando arquivos staged no Git..."
if git ls-files --cached | grep -q "^\.env$" 2>/dev/null; then
    echo -e "${RED}❌ ERRO: Arquivo .env está staged para commit!${NC}"
    echo "   Execute: git rm --cached .env"
    ERRORS=$((ERRORS + 1))
elif git status --porcelain 2>/dev/null | grep "^A.*\.env$" >/dev/null; then
    echo -e "${RED}❌ ERRO: Arquivo .env está staged para commit!${NC}"
    echo "   Execute: git reset HEAD .env"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ Nenhum arquivo .env staged${NC}"
fi
echo ""

# 3. Verificar se há tokens hardcoded
echo "3️⃣  Verificando tokens hardcoded..."
FOUND_TOKENS=0

# Procurar por padrões de tokens comuns
if grep -r -i "pushinpay.*=.*[\"'][a-zA-Z0-9]\{20,\}[\"']" --include="*.ts" --include="*.js" --include="*.tsx" --include="*.jsx" client/ server/ 2>/dev/null | grep -v "process.env" | grep -v "import.meta.env"; then
    echo -e "${RED}❌ ERRO: Possíveis tokens hardcoded encontrados!${NC}"
    ERRORS=$((ERRORS + 1))
    FOUND_TOKENS=1
fi

if [ $FOUND_TOKENS -eq 0 ]; then
    echo -e "${GREEN}✅ Nenhum token hardcoded encontrado${NC}"
fi
echo ""

# 4. Verificar uso correto de variáveis de ambiente
echo "4️⃣  Verificando uso de variáveis de ambiente..."
if grep -r "process\.env\.PUSHINPAY_TOKEN" --include="*.ts" --include="*.js" server/ >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Código usa process.env corretamente${NC}"
else
    echo -e "${YELLOW}⚠️  AVISO: Não encontrado uso de process.env.PUSHINPAY_TOKEN${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 5. Verificar se .env.example existe
echo "5️⃣  Verificando .env.example..."
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ .env.example existe${NC}"
    
    # Verificar se não tem tokens reais no .env.example
    if grep -q "sk_live_\|pk_live_\|token.*[a-zA-Z0-9]\{30,\}" .env.example 2>/dev/null; then
        echo -e "${RED}❌ ERRO: .env.example parece conter tokens reais!${NC}"
        ERRORS=$((ERRORS + 1))
    else
        echo -e "${GREEN}✅ .env.example não contém tokens reais${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  AVISO: .env.example não encontrado${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 6. Verificar arquivos que serão commitados
echo "6️⃣  Arquivos que serão commitados:"
git status --short 2>/dev/null || echo "   Repositório Git não inicializado"
echo ""

# Resumo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ SEGURO PARA COMMIT!${NC}"
    echo ""
    echo "Próximos passos:"
    echo "  git add ."
    echo "  git commit -m \"Sua mensagem\""
    echo "  git push"
else
    echo -e "${RED}❌ ATENÇÃO: $ERRORS erro(s) encontrado(s)!${NC}"
    echo ""
    echo "Corrija os erros acima antes de fazer commit!"
    exit 1
fi

if [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS aviso(s)${NC}"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Para mais informações, consulte SEGURANCA.md"
