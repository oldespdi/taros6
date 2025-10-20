# Deploy no Render - ReveLove.IA

Este guia explica como fazer o deploy da aplicação ReveLove.IA no Render.

## Pré-requisitos

1. Conta no [Render](https://render.com)
2. Repositório Git com o código (GitHub, GitLab, ou Bitbucket)

## Passo a Passo

### 1. Preparar o Repositório

Certifique-se de que todo o código está commitado no seu repositório Git:

```bash
git add .
git commit -m "Preparar para deploy no Render"
git push
```

### 2. Criar Novo Web Service no Render

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +" e selecione "Web Service"
3. Conecte seu repositório Git
4. Selecione o repositório da aplicação

### 3. Configurar o Web Service

**Configurações básicas:**
- **Name:** `revelove-ia` (ou nome de sua preferência)
- **Region:** Escolha a região mais próxima dos seus usuários
- **Branch:** `main` (ou a branch que você usa)
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

**Configurações avançadas:**
- **Plan:** Free (ou escolha um plano pago para melhor performance)
- **Auto-Deploy:** Yes (deploy automático a cada push)

### 4. Variáveis de Ambiente

O Render configura automaticamente:
- `PORT` - Porta do servidor (gerada automaticamente)
- `NODE_ENV` - Definido como `production`

**Variáveis adicionais (se necessário):**

Se você precisar configurar variáveis de ambiente adicionais (como chaves de API), adicione-as na seção "Environment" do painel do Render:

- Exemplo: `API_KEY=sua_chave_aqui`

### 5. Deploy

1. Clique em "Create Web Service"
2. O Render iniciará automaticamente o processo de build e deploy
3. Aguarde a conclusão (pode levar alguns minutos)
4. Quando concluído, você receberá uma URL como: `https://revelove-ia.onrender.com`

## Estrutura de Build

O processo de build executa:

1. **Install:** Instala todas as dependências do `package.json`
2. **Build Frontend:** Vite compila o código React em arquivos estáticos otimizados
3. **Build Backend:** esbuild compila o servidor Express TypeScript em JavaScript
4. **Start:** Inicia o servidor Express que serve tanto a API quanto os arquivos estáticos

## Arquivos Importantes

- **`package.json`**: Define os scripts de build e start
- **`render.yaml`**: Configuração opcional como código (Infrastructure as Code)
- **`.gitignore`**: Garante que apenas os arquivos necessários sejam versionados

## Uploads de Arquivos

⚠️ **Importante:** O Render usa armazenamento efêmero, o que significa que arquivos enviados (uploads) serão perdidos quando o servidor reiniciar.

**Soluções recomendadas:**

1. **Cloudinary** - Para imagens
2. **AWS S3** - Para qualquer tipo de arquivo
3. **Render Disk** - Storage persistente (planos pagos)

Atualmente, os uploads são salvos em `attached_assets/uploads/`. Para produção, considere migrar para um serviço de armazenamento externo.

## Monitoramento

Após o deploy, você pode:

- **Ver Logs:** Acesse a aba "Logs" no dashboard do Render
- **Métricas:** Monitore CPU, memória e tráfego
- **Health Checks:** O Render verifica automaticamente se a aplicação está respondendo

## Problemas Comuns

### Build Falha

- Verifique se todas as dependências estão no `package.json`
- Confira os logs de build no Render
- Certifique-se que `npm run build` funciona localmente

### Aplicação não inicia

- Verifique se o comando start está correto: `npm start`
- Confirme que o servidor está escutando na porta correta (use `process.env.PORT`)
- Revise os logs de deploy

### 502 Bad Gateway

- O servidor pode estar demorando para iniciar
- Verifique se não há erros no código que impedem a inicialização
- Aumente o timeout de health check se necessário

## Uso do render.yaml (Opcional)

O arquivo `render.yaml` permite definir a infraestrutura como código. Para usá-lo:

1. Commit o arquivo `render.yaml` no repositório
2. No Render, use "New" → "Blueprint"
3. Conecte o repositório
4. O Render lerá automaticamente a configuração do `render.yaml`

## Atualizações

Com auto-deploy ativado, toda vez que você fizer push para a branch configurada:

1. O Render detecta automaticamente
2. Executa o build
3. Faz o deploy da nova versão
4. Mantém a versão antiga até que a nova esteja pronta (zero downtime)

## Domínio Customizado

Para usar seu próprio domínio:

1. Vá em "Settings" → "Custom Domain"
2. Adicione seu domínio
3. Configure os registros DNS conforme instruído
4. Aguarde a propagação DNS (pode levar até 48h)

## Suporte

- [Documentação Render](https://render.com/docs)
- [Community Forum](https://community.render.com)
- [Status Page](https://status.render.com)
