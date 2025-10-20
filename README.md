# ReveLove.IA 💜✨

Aplicação web de leitura mística do amor usando IA para gerar perfis românticos personalizados.

## 🌟 Sobre o Projeto

ReveLove.IA é uma experiência imersiva que guia os usuários através de uma jornada mística incluindo:
- Coleta de informações pessoais
- Upload de foto
- Seleção de cartas de tarô
- Questionário personalizado
- Leitura do amor gerada por IA
- Integração com gateway de pagamento PIX

## 🚀 Deploy

### Deploy no Render

Este projeto está pronto para deploy no Render. Siga as instruções detalhadas em [RENDER_DEPLOY.md](./RENDER_DEPLOY.md).

**Resumo rápido:**
1. Conecte seu repositório Git ao Render
2. Configure como Web Service
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Deploy! 🎉

### Deploy Local

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 🛠️ Stack Tecnológica

### Frontend
- React 18 + TypeScript
- Vite
- TanStack Query
- Shadcn/ui + Radix UI
- Tailwind CSS
- Wouter (routing)

### Backend
- Node.js + Express
- TypeScript
- Multer (upload de arquivos)
- Zod (validação)

### Estilo
- Design místico/espiritual dark mode
- Paleta de cores roxo/rosa
- Efeitos de partículas animadas
- Fontes: Playfair Display, Poppins, Montserrat

## 📁 Estrutura do Projeto

```
.
├── client/              # Frontend React
│   └── src/
│       ├── pages/      # Páginas da aplicação
│       ├── components/ # Componentes reutilizáveis
│       └── lib/        # Utilitários
├── server/             # Backend Express
│   ├── index.ts       # Entrada do servidor
│   ├── routes.ts      # Rotas da API
│   └── storage.ts     # Camada de persistência
├── shared/            # Código compartilhado
│   └── schema.ts      # Schemas e tipos
├── attached_assets/   # Assets estáticos
│   └── uploads/       # Uploads de usuários
└── render.yaml        # Configuração Render
```

## 🔧 Configuração

### Variáveis de Ambiente

O projeto usa as seguintes variáveis de ambiente:

- `PORT` - Porta do servidor (padrão: 5000)
- `NODE_ENV` - Ambiente (development/production)

Para adicionar mais variáveis, crie um arquivo `.env` localmente (não commitá-lo).

### Armazenamento

**Desenvolvimento:** Usa armazenamento em memória (MemStorage)

**Produção:** Para deploy em produção, considere:
- Migrar para banco de dados PostgreSQL
- Usar serviço externo para uploads (Cloudinary, AWS S3)

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm start        # Inicia servidor em produção
npm run check    # Verifica tipos TypeScript
npm run db:push  # Sincroniza schema do banco de dados
```

## 🎨 Design

O projeto segue um design místico e espiritual com:
- Tema dark mode
- Gradientes românticos (roxo/rosa)
- Animações suaves
- Efeitos de partículas
- Tipografia elegante

## 🔐 Segurança

- Validação de dados com Zod
- Sanitização de inputs
- Limite de tamanho de upload (5MB)
- Headers de segurança configurados

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:
- Desktop
- Tablet
- Mobile

## 🐛 Troubleshooting

### Build falha
- Verifique se todas as dependências estão instaladas: `npm install`
- Limpe o cache: `rm -rf node_modules dist && npm install`

### Uploads não funcionam
- Verifique se o diretório `attached_assets/uploads/` existe
- Em produção, considere usar storage externo (Render storage é efêmero)

### Porta em uso
- O servidor usa a porta definida em `PORT` (padrão: 5000)
- Mude a porta: `PORT=3000 npm start`

## 📄 Licença

MIT

## 🤝 Contribuindo

Este é um projeto privado. Para contribuir, entre em contato com o proprietário.

---

Desenvolvido com 💜 para conectar corações através da magia e tecnologia.
