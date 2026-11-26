# Igor Auto Elétrica — reformulação (fase 1)

Esta branch contém a primeira etapa visual e estrutural da reformulação da presença digital da Igor Auto Elétrica.

## Branch
`redesign/phase-1-premium-site`

## Arquivos
- `index.html`: página inicial.
- `servicos.html`: página independente de serviços.
- `oficina.html`: página institucional e espaço para visita 360°.
- `localizacao.html`: endereço e mapa.
- `contato.html`: formulário que prepara mensagem no WhatsApp.
- `styles.css`: sistema visual responsivo.
- `app.js`: navegação, conteúdo padrão e leitura opcional da configuração pública do Supabase.
- `admin/login.html`: autenticação Supabase.
- `admin/index.html`: editor inicial do registro `site_config/main`.
- `robots.txt` e `sitemap.xml`: indexação.

## Importante — integrações pendentes de validação
O código legado apontava para um projeto Supabase cuja disponibilidade e permissões ainda não foram confirmadas. Antes de usar o painel em produção, verificar o projeto correto, status, tabela `site_config`, autenticação, Storage e políticas RLS. O frontend usa somente publishable/anon key; nunca inserir service_role no navegador.

A visita 360° original e o upload de imagens precisam ser reconectados após a auditoria do Storage. O mascote 3D, temas configuráveis, avaliações Google e editor administrativo completo ainda não fazem parte desta primeira etapa.

## Publicação
A branch foi enviada para um deploy de preview Vercel. Não foi promovida para produção. A branch `main` permanece preservada.
