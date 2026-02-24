# 🛵 Conecta Delivery

> **O Sistema definitivo, em tempo real e de baixo custo para pequenos negócios de Delivery, unificando pedidos do iFood, WhatsApp e Balcão.**

O **Conecta Delivery** foi desenhado com o objetivo de centralizar as demandas de um Delivery comum (que sofre por gerenciar múltiplas telas, celular e iFood ao mesmo tempo) em um único painel. O grande destaque desta aplicação está na **sincronização em tempo real** dos pedidos e numa comunicação fluida e barata usando as mais modernas tecnologias Web.

---

## 🎯 Principais Funcionalidades

- **Omnichannel:** Recebe pedidos via `Typebot/WhatsApp` (Evolution API), `iFood` e entradas Manuais (Balcão).
- **Tempo Real (WebSockets):** Todo pedido novo pisca na tela do atendente sem precisar de atualizações na página graças ao `Socket.io`.
- **Impressão Térmica Nativa:** CSS otimizado para bobinas de 80mm não fiscais diretamente pelo navegador (`window.print()`).
- **Arquitetura Multi-Tenant:** Banco de dados preparado (Prisma) para expansão SaaS (um banco gerindo múltiplas lojas).

---

## 💻 Tech Stack (Tecnologias Utilizadas)

Este projeto foi construído pensando nas limitações de servidores baratos (como VPS Hostinger) sem abrir mão de alta velocidade, tipagem estática e escalabilidade.

### Frontend
- **React.js + Vite:** Velocidade de build e renderização ultra rápida.
- **Tailwind CSS:** Estilização utilitária e componentes responsivos (com suporte a `@media print` para cupom de impressora).
- **TypeScript:** Segurança na tipagem do sistema.
- **Lucide React:** Conjunto impecável de Ícones.

### Backend
- **Node.js + Express:** Servidor leve e padronizado para as rotas da REST API.
- **Socket.io:** O coração das atualizações em tempo-real entre a VPS e a tela do navegador.
- **Prisma (ORM):** Gerenciador do banco de dados relacional com tipagem ponta a ponta e sistema de migrações (`prisma db push`).
- **PostgreSQL / Docker:** Banco relacional hospedado isoladamente para máxima integridade de dados do cardápio e ordens.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (v18+)
- Docker Desktop (Para rodar o Banco de Dados rápido e isolado)

### 1. Banco de Dados (PostgreSQL via Docker)
Navegue até a pasta `backend` e rode o container do Docker:
```bash
cd backend
docker-compose up -d
```

### 2. Configurando o Backend (Node + Prisma)
```bash
cd backend
npm install

# Instala e gera as tabelas do Prisma no seu Banco Docker recém-criado
npx prisma generate
npx prisma db push

# (Opcional) Popule o banco com dados falsos Iniciais para testes visuais
npx tsc
node dist/prisma/seed.js

# Rode o servidor Node e o Socket.io na Porta 3001
npm run dev
```

### 3. Rodando a Interface de Usuário (React)
Em outra aba de terminal, vá na pasta raiz do projeto:
```bash
npm install
npm run dev
```

Abra seu navegador em [http://localhost:3000](http://localhost:3000) e divirta-se!

---

## 🤝 Integração Typebot + Evolution API (WhatsApp)
O sistema possui endpoints na pasta `webhookRoutes.ts` que escutam os gatilhos HTTP (POST) enviados por gerenciadores de APIs como a Evolution. Isso permite que um Typebot colete o pedido do cliente e dispare instantaneamente a ordem pronta para a fila da Cozinha no painel React!

---
*Desenvolvido por Kevin*.
