# 🚀 PASSO A PASSO - Deploy no Render

## ✅ SEU PROJETO ESTÁ 100% PRONTO!

O build foi testado e está funcionando perfeitamente. Siga estes passos:

---

## 📋 Opção 1: Deploy Via GitHub (RECOMENDADO)

### 1️⃣ Enviar para o GitHub

```bash
# No Shell do Replit, execute:

git init
git add .
git commit -m "Deploy para Render"
git branch -M main
```

Agora conecte ao GitHub:

1. Vá em https://github.com/new
2. Crie um repositório (ex: `revelove-ia`)
3. **NÃO marque** "Initialize with README"
4. Clique em "Create repository"

```bash
# Cole o comando que o GitHub mostrar, algo como:
git remote add origin https://github.com/SEU-USUARIO/revelove-ia.git
git push -u origin main
```

### 2️⃣ Criar Web Service no Render

1. Acesse https://dashboard.render.com
2. Clique em **"New +"** → **"Web Service"**
3. Clique em **"Connect GitHub"** (ou GitLab)
4. Selecione seu repositório `revelove-ia`

### 3️⃣ Configurar o Web Service

Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Name** | `revelove-ia` (ou nome que preferir) |
| **Region** | Oregon (US West) ou mais próximo |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

### 4️⃣ Escolher o Plano

- **Free** (gratuito) - Funciona perfeitamente para testes
- Ou escolha um plano pago se preferir

### 5️⃣ ⚠️ IMPORTANTE - Adicionar Variável de Ambiente

**ANTES de clicar em "Create Web Service":**

1. Role para baixo até **"Environment Variables"**
2. Clique em **"Add Environment Variable"**
3. Adicione:
   - **Key:** `PUSHINPAY_TOKEN`
   - **Value:** [Cole aqui seu token da Pushin Pay]

### 6️⃣ Criar e Aguardar

1. Clique em **"Create Web Service"**
2. O Render vai começar o deploy
3. Aguarde 3-5 minutos (você verá os logs)
4. Quando aparecer "Live" em verde, está pronto! ✅

### 7️⃣ Acessar sua Aplicação

Sua URL será algo como:
```
https://revelove-ia.onrender.com
```

---

## 📋 Opção 2: Deploy Usando render.yaml (Blueprint)

Se você preferir usar o arquivo `render.yaml`:

1. Faça push do código para GitHub (passos acima)
2. No Render, clique em **"New +"** → **"Blueprint"**
3. Conecte o repositório
4. O Render lerá o `render.yaml` automaticamente
5. **IMPORTANTE:** Ainda precisa adicionar `PUSHINPAY_TOKEN` manualmente:
   - Após criar, vá em **"Environment"**
   - Adicione a variável

---

## 🔧 Após o Deploy

### Verificar se Está Funcionando

1. Acesse a URL fornecida
2. Teste o fluxo completo
3. Verifique os logs em **"Logs"** se houver problemas

### Auto-Deploy Ativado

Toda vez que você fizer push para o GitHub:
- ✅ Render detecta automaticamente
- ✅ Faz build
- ✅ Deploy da nova versão

---

## ⚠️ IMPORTANTE - Lembre-se

### Armazenamento Efêmero

O plano Free usa storage efêmero. Uploads de fotos serão perdidos ao reiniciar.

**Soluções:**
- **Cloudinary** (recomendado) - Grátis até 25GB
- **AWS S3**
- **Render Disk** (planos pagos)

### Banco de Dados

Atualmente usa armazenamento em memória. Para produção real:
- **Render PostgreSQL** (tem plano free)
- **Neon** (Postgres grátis)
- **Supabase**

---

## 🆘 Problemas Comuns

### Build Falha
```
Erro: Build failed
```
**Solução:** Verifique os logs. Geralmente é falta de dependência.

### Aplicação não inicia
```
502 Bad Gateway
```
**Solução:** 
- Verifique se `PUSHINPAY_TOKEN` está configurado
- Confira os logs de deploy
- Servidor demora ~30s para iniciar (normal no plano free)

### Primeiro acesso demora
No plano free, após 15min sem uso, o servidor "dorme".
- Primeira visita demora ~30-60s para "acordar"
- Isso é normal!

---

## 📊 Recursos do Plano Free

| Recurso | Free | Pago |
|---------|------|------|
| **Builds por mês** | 400 horas | Ilimitado |
| **RAM** | 512 MB | Até 32 GB |
| **Sleep após inatividade** | 15 minutos | Nunca |
| **SSL/HTTPS** | ✅ Sim | ✅ Sim |
| **Auto-deploy** | ✅ Sim | ✅ Sim |
| **Domínio customizado** | ✅ Sim | ✅ Sim |

---

## 🎯 Checklist Final

Antes de fazer deploy, confirme:

- [ ] Código está no GitHub
- [ ] `render.yaml` existe (opcional, mas útil)
- [ ] `.env` NÃO está no repositório
- [ ] Você tem o token da Pushin Pay em mãos
- [ ] Build local funcionou (`npm run build`)

---

## 🔗 Links Úteis

- [Dashboard Render](https://dashboard.render.com)
- [Documentação Render](https://render.com/docs)
- [Status Render](https://status.render.com)
- [Community Render](https://community.render.com)

---

## 🎉 Pronto!

Seu projeto está 100% preparado. Qualquer problema, confira:
1. Os logs no dashboard do Render
2. Este guia novamente
3. SEGURANCA.md para questões de tokens

**Tempo total estimado:** 10-15 minutos do início ao fim! ⏱️

---

**Desenvolvido com 💜 ReveLove.IA**
