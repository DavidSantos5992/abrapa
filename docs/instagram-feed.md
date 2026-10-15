# Feed do Instagram na home

A home busca as três publicações de foto mais recentes de `@abrapa_jundiai`, incluindo carrosséis, pela API oficial do Instagram. A função do Vercel mantém a credencial no servidor e entrega ao navegador somente os dados necessários para mostrar os cards. A resposta bem-sucedida fica em cache por 15 minutos.

## Configuração necessária

1. A conta do Instagram precisa ser profissional (Business ou Creator) e estar vinculada a uma Página do Facebook. O token de usuário do Facebook deve ter as permissões `instagram_basic`, `pages_show_list` e `pages_read_engagement` para essa Página.
2. Configure estas variáveis no projeto Vercel, nos ambientes que serão usados:

   - `INSTAGRAM_ACCESS_TOKEN`: token de usuário do Facebook com as permissões acima. Apesar do nome da variável, a função consulta `graph.facebook.com`.
   - `INSTAGRAM_USER_ID`: identificador da conta profissional autorizada.
   - `INSTAGRAM_GRAPH_API_VERSION`: versão da API, opcional; o padrão é `v26.0`.

3. Faça um novo deploy depois de adicionar ou trocar as variáveis. Nunca use o prefixo `VITE_` no token e nunca coloque o valor real no repositório.

Tokens podem expirar ou perder autorização. O token atual de longa duração vence em 14 de dezembro de 2026; renove a credencial no aplicativo Meta e atualize a variável no Vercel antes dessa data.

## Desenvolvimento local

O servidor Vite (`npm run dev`) não executa funções do Vercel. Para validar o endpoint localmente, use o Vercel CLI com as variáveis configuradas (`vercel dev`). Sem as credenciais, a home continua utilizável e mostra o link para o perfil oficial.
