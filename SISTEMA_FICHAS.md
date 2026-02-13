# Sistema de Fichas - Documentação

## 📋 Visão Geral

Sistema completo de gerenciamento de fichas implementado com Next.js, Sequelize e PostgreSQL. Permite cadastrar, visualizar, atualizar quantidades e excluir fichas de produtos.

## 🗄️ Estrutura do Banco de Dados

### Tabela: `fichas`

| Campo          | Tipo         | Descrição                    |
|----------------|--------------|------------------------------|
| ficha_id       | INTEGER      | ID (Auto Increment, PK)      |
| nome_produto   | STRING       | Nome do produto              |
| quantidade     | INTEGER      | Quantidade de fichas         |
| data_cadastro  | DATE         | Data de cadastro             |

## 🔧 Arquivos Criados

### Modelo
- `models/Ficha/ficha.js` - Modelo Sequelize para fichas

### APIs

#### POST - Cadastrar Ficha
- **Rota:** `/api/Posts/CadFicha/cadastrarFicha`
- **Body:** `{ nome_produto: string, quantidade: number }`
- **Arquivo:** `src/pages/api/Posts/CadFicha/cadastrarFicha.js`

#### GET - Listar Fichas
- **Rota:** `/api/Gets/GetFichas/getFichas`
- **Retorna:** Array de fichas ordenadas por data (mais recentes primeiro)
- **Arquivo:** `src/pages/api/Gets/GetFichas/getFichas.js`

#### DELETE - Excluir Ficha
- **Rota:** `/api/Delete/DeleteFichaById/[ficha_id]`
- **Parâmetro:** `ficha_id` (URL param)
- **Arquivo:** `src/pages/api/Delete/DeleteFichaById/[ficha_id].js`

#### PATCH - Atualizar Quantidade
- **Rota:** `/api/Patch/PatchQuantidadeFicha/[ficha_id]`
- **Parâmetro:** `ficha_id` (URL param)
- **Body:** `{ quantidade: number }`
- **Arquivo:** `src/pages/api/Patch/PatchQuantidadeFicha/[ficha_id].js`

### Hooks

#### useFichas
- **Arquivo:** `hook/Fichas/useFichas.js`
- **Retorna:** `{ fichas, isLoading, refetch }`
- **Função:** Busca e gerencia a lista de fichas

#### useCadastrarFicha
- **Arquivo:** `hook/Fichas/useCadastrarFicha.js`
- **Retorna:** `{ cadastrar, isLoading, error }`
- **Função:** Cadastra uma nova ficha

#### useDeleteFicha
- **Arquivo:** `hook/Fichas/useDeleteFicha.js`
- **Retorna:** `{ deletar, isLoading, error }`
- **Função:** Deleta uma ficha existente

#### useUpdateQuantidadeFicha
- **Arquivo:** `hook/Fichas/useUpdateQuantidadeFicha.js`
- **Retorna:** `{ updateQuantidade, isLoading, error }`
- **Função:** Atualiza a quantidade de uma ficha

### Componentes

#### CadFichasComponent
- **Arquivo:** `src/app/componentes/(ComponentesPedidos)/Fichas/cadastroFicha.jsx`
- **Props:** `{ onClose, onSuccess }`
- **Descrição:** Modal moderno para cadastro de fichas com validações

#### FichasComponent
- **Arquivo:** `src/app/componentes/(ComponentesPedidos)/Fichas/componentFichas.jsx`
- **Descrição:** Interface completa para gerenciar fichas com:
  - Listagem em cards responsivos
  - Incremento/decremento de quantidade
  - Exclusão de fichas
  - Estado vazio
  - Loading states

## 🎨 Design

### Características
- ✅ Design moderno com gradientes azuis
- ✅ Ícones Lucide React
- ✅ Cards responsivos (grid adaptativo)
- ✅ Animações suaves (hover, transformações)
- ✅ Estados de loading e processamento
- ✅ Modal glassmorphism
- ✅ Feedback visual para todas as ações

### Paleta de Cores
- **Primary:** Azul (from-blue-600 to-blue-700)
- **Success:** Verde (green-500/600)
- **Danger:** Vermelho (red-500/600)
- **Background:** Gradiente azul claro (from-blue-50 to-indigo-100)

## 🚀 Como Usar

### 1. Sincronizar o Banco de Dados
```bash
node script/syncDB.js
```

### 2. Acessar a Tela de Fichas
- Rota: `/Telas/Fichas`
- URL: `http://localhost:3000/Telas/Fichas`

### 3. Funcionalidades Disponíveis
- **Cadastrar:** Clique em "Nova Ficha" ou "Cadastrar Primeira Ficha"
- **Incrementar:** Clique no botão verde (+)
- **Decrementar:** Clique no botão vermelho (-)
- **Excluir:** Clique no ícone de lixeira no card
- **Atualização automática:** Todas as ações atualizam a lista automaticamente

## 📦 Dependências Utilizadas
- `axios` - Requisições HTTP
- `lucide-react` - Ícones modernos
- `sequelize` - ORM para banco de dados
- `react` - Biblioteca UI

## 🛠️ Manutenção

### Adicionar Novos Campos
1. Atualizar modelo em `models/Ficha/ficha.js`
2. Sincronizar banco: `node script/syncDB.js`
3. Atualizar APIs conforme necessário
4. Atualizar componentes de UI

### Debugging
- Logs de erro no console do navegador
- Logs de servidor no terminal
- Validações de formulário com alerts

## ✨ Melhorias Implementadas
- ✅ Tabela de banco de dados criada
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Interface moderna e intuitiva
- ✅ Hooks customizados reutilizáveis
- ✅ Loading states e feedback visual
- ✅ Validações de dados
- ✅ Design responsivo
- ✅ Controle de quantidade (incremento/decremento)
- ✅ Confirmação antes de excluir
