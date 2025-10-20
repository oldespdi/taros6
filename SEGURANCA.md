# 🔐 Guia de Segurança - Tokens e Variáveis de Ambiente

## ⚠️ IMPORTANTE: Proteção de Tokens de API

Este projeto usa tokens de API que **NUNCA** devem ser commitados no Git ou expostos publicamente.

## 🔑 Tokens Necessários

### PUSHINPAY_TOKEN
- **O que é:** Token de autenticação da API Pushin Pay para pagamentos PIX
- **Onde obter:** Dashboard da Pushin Pay (https://pushinpay.com.br)
- **Uso:** Gateway de pagamento PIX

## 📋 Como Configurar de Forma Segura

### 1️⃣ No Desenvolvimento Local (Replit)

No Replit, os tokens já estão configurados como **Secrets**:

1. Clique em "Tools" (lado esquerdo)
2. Selecione "Secrets"
3. Verifique se `PUSHINPAY_TOKEN` está configurado
4. ✅ O Replit gerencia isso automaticamente e não expõe no código

### 2️⃣ Para Deploy no Render

**NUNCA faça commit do arquivo `.env` com o token real!**

Siga estes passos:

#### A. Antes de Commitar no Git

1. **Verifique o .gitignore:**
   ```bash
   # Certifique-se que .env está listado
   cat .gitignore | grep .env
   ```
   
2. **Remova qualquer .env do stage:**
   ```bash
   git rm --cached .env 2>/dev/null || true
   ```

3. **Commit seguro:**
   ```bash
   git add .
   git commit -m "Deploy seguro sem tokens"
   git push
   ```

#### B. Configurar no Render

1. **Acesse o Render Dashboard**
2. Vá no seu Web Service criado
3. Clique em **"Environment"** no menu lateral
4. Clique em **"Add Environment Variable"**

5. **Adicione a variável:**
   - **Key:** `PUSHINPAY_TOKEN`
   - **Value:** [Cole aqui seu token real da Pushin Pay]
   - Clique em "Save Changes"

6. **O Render fará redeploy automaticamente** com a variável configurada

#### C. Variáveis Já Configuradas Automaticamente

O Render configura automaticamente:
- ✅ `PORT` - Porta dinâmica
- ✅ `NODE_ENV` - Definido como "production"

## 🚫 O Que NUNCA Fazer

❌ **NUNCA commitar arquivos .env com tokens reais**
```bash
# ERRADO - NÃO FAÇA ISSO
git add .env
git commit -m "adicionar configurações"
```

❌ **NUNCA hardcode tokens no código**
```javascript
// ERRADO - NÃO FAÇA ISSO
const token = "sk_live_abc123def456";
```

❌ **NUNCA compartilhe tokens em públicos**
- Issues do GitHub
- Comentários em código
- Screenshots
- Mensagens públicas

## ✅ Boas Práticas

✅ **Use variáveis de ambiente**
```javascript
// CORRETO
const token = process.env.PUSHINPAY_TOKEN;
```

✅ **Mantenha .env no .gitignore**
```gitignore
.env
.env.local
.env.production
```

✅ **Use .env.example como template**
```bash
# Copie o exemplo e preencha com valores reais
cp .env.example .env
# Edite o .env com seus tokens (nunca commite este arquivo!)
```

✅ **Configure secrets no ambiente de deploy**
- Replit: Use Secrets
- Render: Use Environment Variables
- Vercel: Use Environment Variables
- Netlify: Use Environment Variables

## 🔍 Verificar Se Está Seguro

Antes de fazer push para o Git:

```bash
# 1. Verificar se .env está no .gitignore
grep -q "^\.env$" .gitignore && echo "✅ .env está protegido" || echo "❌ ATENÇÃO: .env não está no .gitignore!"

# 2. Verificar se não há tokens hardcoded
grep -r "sk_" --include="*.ts" --include="*.js" client/ server/ && echo "❌ TOKENS ENCONTRADOS!" || echo "✅ Nenhum token hardcoded"

# 3. Ver o que será commitado
git status
```

## 🆘 E Se Eu Já Commitei Um Token?

**Se você acidentalmente commitou um token:**

1. **URGENTE: Revogue o token imediatamente**
   - Acesse o dashboard da Pushin Pay
   - Gere um novo token
   - Revogue o token exposto

2. **Limpe o histórico do Git** (avançado)
   ```bash
   # Remover arquivo do histórico
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch .env" \
   --prune-empty --tag-name-filter cat -- --all
   
   # Force push (CUIDADO!)
   git push origin --force --all
   ```

3. **Configure o novo token** nas variáveis de ambiente

## 📚 Referências

- [Boas Práticas de Secrets - GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Environment Variables - Render Docs](https://render.com/docs/environment-variables)
- [Variáveis de Ambiente - Node.js](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)

---

## 🎯 Checklist Rápido

Antes de fazer deploy:

- [ ] `.env` está no `.gitignore`
- [ ] Não há tokens hardcoded no código
- [ ] `.env.example` tem apenas exemplos (sem tokens reais)
- [ ] Tokens estão configurados no ambiente de deploy (Render)
- [ ] `git status` não mostra arquivo `.env` para commit
- [ ] Código usa `process.env.NOME_DA_VARIAVEL`

---

**Lembre-se:** A segurança dos seus tokens é fundamental para proteger sua aplicação e seus usuários! 🔒
