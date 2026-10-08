# Feed do Instagram na home

A home busca as três publicações de foto mais recentes de `@abrapa_jundiai`, incluindo carrosséis, pela API oficial do Instagram. A função do Vercel mantém a credencial no servidor e entrega ao navegador somente os dados necessários para mostrar os cards. A resposta bem-sucedida fica em cache por 15 minutos.

## Configuração necessária

1. A conta do Instagram precisa ser profissional (Business ou Creator) e autorizar um aplicativo da Meta com a permissão `instagram_business_basic`.
2. Configure estas variáveis no projeto Vercel, nos ambientes que serão usados:

   - `INSTAGRAM_ACCESS_TOKEN`: token de usuário do Instagram com a permissão acima.
   - `INSTAGRAM_USER_ID`: identificador da conta profissional autorizada.
   - `INSTAGRAM_GRAPH_API_VERSION`: versão da API, opcional; o padrão é `v26.0`.

3. Faça um novo deploy depois de adicionar ou trocar as variáveis. Nunca use o prefixo `VITE_` no token e nunca coloque o valor real no repositório.

Tokens podem expirar ou perder autorização. Se o feed deixar de carregar, confira a validade do token e gere/renove a credencial no aplicativo Meta antes de atualizar a variável no Vercel.

## Desenvolvimento local

O servidor Vite (`npm run dev`) não executa funções do Vercel. Para validar o endpoint localmente, use o Vercel CLI com as variáveis configuradas (`vercel dev`). Sem as credenciais, a home continua utilizável e mostra o link para o perfil oficial.
