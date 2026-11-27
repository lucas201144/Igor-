# Igor Auto Elétrica — reformulação

Branch de desenvolvimento: `redesign/phase-1-premium-site`

## Incluído nesta etapa
- Site público com páginas independentes: início, serviços, oficina, localização e contato.
- Conteúdo e serviços carregados de `site_config/main`.
- Quatro temas predefinidos e tema customizável, compartilhados entre páginas.
- Painel administrativo com login Supabase, edição de conteúdo, serviços, informações comerciais, temas, mascote, avaliações e imagens.
- Uploads para o bucket `site-assets` com validação de tipo e tamanho.
- Visita panorâmica 360° com Three.js, arraste e zoom.
- Mascote ilustrado em CSS, com variações de roupa, expressões e movimentos leves.
- Galeria de imagens e link de avaliações Google.
- SEO básico, sitemap e robots.txt.

## Supabase: bloqueio de infraestrutura
O código original aponta para o projeto `zitqgkmrndmivgkmzuvq`, mas esse projeto não aparece na lista de projetos acessíveis da conexão Supabase atual. Os dois projetos listados na conta estão com status `INACTIVE`. Não foi possível consultar tabelas, Storage ou políticas, nem aplicar a migração.

A migração está em `supabase/migrations/20261127000000_igor_site.sql`. Ela cria a tabela `site_config`, políticas RLS e o bucket público de leitura `site-assets`, com escrita reservada a usuários cujo `app_metadata.role` seja `admin`.

Depois de reativar o projeto correto e confirmar suas credenciais:
1. Execute o SQL da migração no SQL Editor.
2. Crie/convide o usuário administrativo no Supabase Auth.
3. Atribua o papel admin em `auth.users.raw_app_meta_data` usando o comentário final da migração.
4. Saia e entre novamente no painel para renovar o JWT.
5. Configure URL e publishable key corretas em `app.js`, `admin/index.html` e `admin/login.html`.

Não use service_role no navegador.

## Mascote
A versão atual é uma ilustração animada em CSS para manter o site funcional sem depender de um arquivo 3D externo. Ela não substitui o modelo GLB/GLTF esquelético definitivo baseado na referência visual do proprietário. A produção e integração desse modelo ainda exige o arquivo do personagem e suas animações.

## Deploy
A branch é destinada a Preview. A produção e a branch `main` não foram alteradas.
