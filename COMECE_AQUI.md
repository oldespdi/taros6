# 🎯 COMECE AQUI - Deploy no Render

## ✅ SEU PROJETO ESTÁ 100% PRONTO!

Tudo foi testado e configurado. Siga os passos abaixo:

---

## 🚀 OPÇÃO RÁPIDA (Recomendada)

### 1. Execute o Script Automático

No Shell do Replit:

```bash
./preparar-deploy.sh
```

Este script vai:
- ✅ Testar o build de produção
- ✅ Verificar que tudo está OK
- ✅ Mostrar os próximos passos

### 2. Siga as Instruções

O script vai mostrar exatamente o que fazer em seguida!

---

## 📋 OPÇÃO MANUAL (Detalhada)

Se preferir fazer passo a passo manualmente:

### 1️⃣ Criar Repositório no GitHub

1. Vá em https://github.com/new
2. Nome: `revelove-ia` (ou outro)
3. **NÃO marque** "Initialize with README"
4. Clique em **Create repository**

### 2️⃣ Enviar Código para o GitHub

No Shell do Replit:

```bash
git init
git add .
git commit -m "Deploy para Render"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/revelove-ia.git
git push -u origin main
```

### 3️⃣ Criar Web Service no Render

1. Acesse https://dashboard.render.com
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub
4. Selecione o repositório `revelove-ia`

### 4️⃣ Configurar

| Campo | Valor |
|-------|-------|
| Name | `revelove-ia` |
| Runtime | `Node` |
| Build Command | `npm install --include=dev && npm run build` |
| Start Command | `npm start` |
| Plan | Free |

### 5️⃣ ⚠️ IMPORTANTE - Token da Pushin Pay

**ANTES de clicar em "Create Web Service":**

Role até **Environment Variables** e adicione:
- **Key:** `PUSHINPAY_TOKEN`
- **Value:** [Seu token da Pushin Pay]

### 6️⃣ Deploy!

1. Clique em **"Create Web Service"**
2. Aguarde 3-5 minutos
3. Acesse sua URL: `https://revelove-ia.onrender.com`

---

## 📚 Documentação Disponível

- **`PASSO_A_PASSO_RENDER.md`** - Guia completo e detalhado
- **`SEGURANCA.md`** - Como proteger seus tokens
- **`RENDER_DEPLOY.md`** - Informações técnicas
- **`README.md`** - Documentação do projeto

---

## 🆘 Precisa de Ajuda?

### Problemas no Build?
```bash
npm run build
```
Se der erro, verifique os logs.

### Problemas de Segurança?
```bash
./verificar-seguranca.sh
```
Verifica se tokens estão protegidos.

### Deploy não Funciona?

1. Verifique se adicionou `PUSHINPAY_TOKEN`
2. Confira os logs no Render
3. Primeiro acesso demora ~30s (normal no plano free)

---

## ⏱️ Tempo Estimado

- GitHub: 2 minutos
- Configurar Render: 3 minutos
- Build e Deploy: 3-5 minutos

**Total: ~10 minutos** do início ao fim!

---

## 🎉 É Isso!

Seu projeto tem tudo pronto:
- ✅ Build testado e funcionando
- ✅ Tokens protegidos
- ✅ Configuração do Render pronta
- ✅ Scripts de verificação
- ✅ Documentação completa

**Bom deploy! 🚀💜**
