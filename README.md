# Mini Seller Console

Uma aplicação React moderna para gerenciamento de leads e oportunidades de vendas, desenvolvida com foco em performance e experiência do usuário.

## 🎯 Sobre o Projeto

O **Mini Seller Console** é uma aplicação web que permite aos usuários:
- Visualizar e gerenciar uma lista de leads
- Filtrar e pesquisar leads por diferentes critérios
- Editar informações dos leads em tempo real
- Converter leads em oportunidades de vendas
- Gerenciar o pipeline de vendas

## ✨ Funcionalidades Implementadas

### ✅ MVP Completo
- **Lista de Leads**: Carregamento de dados de arquivo JSON local
- **Painel de Detalhes**: Edição inline de status e email com validação
- **Conversão para Oportunidade**: Transformação de leads em oportunidades
- **Filtros e Pesquisa**: Busca por nome/empresa e filtro por status
- **Ordenação**: Classificação por score (crescente/decrescente)
- **Persistência**: Filtros e configurações salvas no localStorage

### 🚀 Recursos Adicionais
- **Simulação de Latência**: Experiência realista com delays simulados
- **Tratamento de Erros**: Rollback automático em caso de falha
- **Estados de Loading**: Feedback visual durante operações
- **Interface Responsiva**: Layout adaptável para diferentes dispositivos
- **Validação de Email**: Verificação de formato de email em tempo real

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.1.1** - Biblioteca principal para interface
- **Vite 7.1.2** - Build tool e dev server
- **Tailwind CSS 3.4.3** - Framework de estilização

### Desenvolvimento
- **ESLint 9.33.0** - Linting e qualidade de código
- **PostCSS 8.5.6** - Processamento de CSS
- **Autoprefixer 10.4.21** - Compatibilidade cross-browser

### Estrutura
- **Componentes Modulares** - Arquitetura reutilizável
- **Hooks Personalizados** - Lógica de negócio organizada
- **Estado Local** - Gerenciamento de estado com React hooks

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── LeadTable.jsx           # Tabela principal de leads
│   ├── LeadFilters.jsx         # Filtros e pesquisa
│   ├── LeadDetailPanel.jsx     # Painel de edição
│   └── OpportunitiesTable.jsx  # Tabela de oportunidades
├── pages/              # Páginas da aplicação
│   └── App.jsx                # Componente principal
├── utils/              # Utilitários e helpers
│   └── leads.js               # Funções auxiliares
├── assets/             # Recursos estáticos
├── leads.json          # Dados de exemplo
└── main.jsx            # Ponto de entrada
```

## 🚀 Como Usar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd test-uitify
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute em modo desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra [http://localhost:5173](http://localhost:5173) no seu navegador

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa verificação de código

## 📊 Funcionalidades Detalhadas

### Gerenciamento de Leads
- **Visualização**: Lista paginada com informações completas
- **Filtros**: Por status (Novo, Contatado, Qualificado, Convertido)
- **Pesquisa**: Busca por nome do lead ou empresa
- **Ordenação**: Por score de prioridade

### Edição de Leads
- **Painel Deslizante**: Interface moderna para edição
- **Validação**: Verificação de formato de email
- **Persistência**: Salvamento automático das alterações
- **Rollback**: Recuperação automática em caso de erro

### Conversão de Oportunidades
- **Transformação**: Conversão automática de leads
- **Pipeline**: Acompanhamento do estágio de vendas
- **Rastreamento**: Histórico de conversões

## 🔧 Configuração

### Variáveis de Ambiente
A aplicação não requer variáveis de ambiente para funcionamento básico.

### Personalização
- **Dados**: Modifique `src/leads.json` para seus dados
- **Estilos**: Personalize através do `tailwind.config.js`
- **Validações**: Ajuste regras em `src/utils/leads.js`

## 🧪 Testes

A aplicação inclui simulações para:
- **Latência de Rede**: Delays realistas para operações
- **Falhas**: Simulação de erros para testar resiliência
- **Estados**: Loading, sucesso e erro

## 📱 Responsividade

- **Desktop**: Layout otimizado para telas grandes
- **Tablet**: Adaptação para dispositivos médios
- **Mobile**: Interface responsiva para smartphones

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido como projeto de teste para demonstrar habilidades em:
- React moderno com hooks
- Tailwind CSS para estilização
- Arquitetura de componentes
- Gerenciamento de estado
- UX/UI responsivo

---

**Status**: ✅ MVP Completo + Recursos Adicionais  
**Última Atualização**: Dezembro 2024  
**Versão**: 1.0.0
