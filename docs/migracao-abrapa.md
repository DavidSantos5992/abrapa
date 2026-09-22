# Migração editorial — ABRAPA Jundiaí

## Escopo confirmado em 21/09/2026

Referência: `../pixel-perfect-canvas-199`, confirmada pelo usuário. Destino: `/abrapa`.
Preservam-se os grids, containers, tipografia, animações e seções. A paleta foi atualizada para vermelho e tons de
vermelho conforme a correção solicitada pelo usuário.
A marca é o PNG oficial da ABRAPA, sem redesenho. A rota adicional `/contato`, já
existente, é mantida; `/parceiros` foi recuperada.

## Fontes oficiais

- https://abrapajundiai.org.br/ — identidade, missão, visão, valores, público,
  projetos Catarina/Laurinha/Milena, eventos, parceiros, contatos e doações.
- https://abrapajundiai.org.br/projetos-e-campanhas/ — cestas básicas, suplementos,
  remédios, artesanato e outras formas de apoio material.
- https://abrapajundiai.org.br/galeria/ — consulta sem datas confirmadas dos eventos.
- https://www.instagram.com/abrapa_jundiai/ — perfil oficial. Acesso direto bloqueado;
  integração visível no site oficial. Nenhum dado depende de postagem não verificada.
- API pública do mesmo site: `/wp-json/wp/v2/pages/851`, `/303` e `/369`.

## Correspondência editorial

| Espaço original | Conteúdo adotado |
| --- | --- |
| Hero e apresentação | Identidade, público e atuação regional |
| Contadores sem equivalente comprovado | Apoio, famílias, inclusão e região |
| Serviços | Apoio material, acolhimento, inclusão e artesanato |
| Depoimentos | Missão, visão, valores e informações institucionais, sem falsas citações |
| Equipe nominal | Frentes de apoio confirmadas, no mesmo grid |
| Campanhas e casos | Catarina, Laurinha e Milena, sem idades ou urgência presumidas |
| Necessidades | Cestas básicas, suplementos e remédios |
| Histórico e galeria | Natal, Dia das Crianças e Semana Move no SESC |
| Parceiros | Logos da página oficial, sem atribuir contratos ou benefícios |
| Vídeos sem equivalente | Imagens oficiais nos mesmos espaços |
| Formulário | Campos e validação preservados; mensagem preparada no WhatsApp oficial |
| Doação | Código PIX Itaú e dados bancários publicados pela ABRAPA |

Datas de upload não foram usadas como datas de eventos. Modais, filtros, navegação
por teclado, compartilhamento, download e paginação da galeria foram preservados.

## Contatos e dados bancários verificados

- Rua Secundino Veiga, 119, Centro, Jundiaí — SP.
- Telefone (11) 4521-1248; WhatsApp (11) 96496-8794.
- contato@abrapajundiai.org.br.
- CNPJ 07.055.645/0001-70.
- Itaú: agência 0796, conta 63.623-1.
- PagSeguro: agência 0001, conta 02001239-9.

O botão copia o código completo publicado, sem presumir uma chave PIX pelo CNPJ.
Não há processamento de pagamentos. O visitante confirma a mensagem no WhatsApp.

## Procedência dos arquivos

Base: `https://abrapajundiai.org.br/wp-content/uploads/`.

| Arquivo | Caminho oficial |
| --- | --- |
| logo-abrapa.png / abrapa-logo.png | 2025/03/LogoAbrapa.png |
| banner-home.png / abrapa-social.png | 2025/03/bannerHome-1.png |
| catarina.png | 2025/01/Catarina-abrapa.png |
| laura.png | 2025/01/Laura-abrapa.png |
| milena.png | 2025/01/Milena-Abrapa.png |
| natal.png | 2025/03/NatalAbrapa-1.png |
| dia-criancas.png | 2025/03/DiaDasCriancasAbrapa-1.png |
| semana-move.png | 2025/03/SemanaMovieAbrapa-1.png |
| partners/*.png | 2025/03/{magaluParceiros,lizPaceiros,covabraParceiros,sescParceiros,klabinParceiros}.png e 2025/07/BannerToia.png |

SHA-256 da logo oficial: `474dd991cfea36053dde6a50eed4d83aaf94cee0c13f47b28ee8883e38d47870`.

## Validação da retomada — 21/09/2026

- Build de produção e TypeScript aprovados. Lint sem erros, com sete avisos de
  Fast Refresh nos componentes compartilhados de UI. O build informa bundle
  acima de 500 kB e base Browserslist desatualizada.
- Sete rotas verificadas em 320, 390, 768, 1024 e 1440 px: sem overflow horizontal,
  imagens carregadas, textos alternativos, um H1 por página e canonical correto.
- Inspeção visual de todas as páginas em desktop e mobile; comparação da home
  com a referência nas duas larguras. Todas as seis páginas herdadas mantêm a
  quantidade de seções original; o CSS mantém a estrutura do sistema visual do template, com a paleta vermelha
  solicitada posteriormente pelo usuário.
- Links internos conferidos. Busca no código, arquivos públicos e build sem
  referências institucionais antigas. A marca anterior aparece apenas na
  expressão do teste que impede sua reintrodução.
- Código PIX comparado literalmente com o HTML oficial. Contatos, contas e link
  de Facebook também reconferidos no site da ABRAPA.
- Correção da galeria: a seleção por `#imagem-N` agora acompanha mudanças de
  endereço pelo React Router, inclusive ao reabrir uma imagem na mesma página.
- Correção de acessibilidade no formulário de parceiros: `FormControl` envolve
  diretamente cada input/textarea, associando rótulos e erros ao campo correto.
- Textos de campanhas ajustados para não presumir que projetos estão em andamento.

O teste `scripts/verify-ui.cjs` cobre menu mobile, filtros, teclado, download,
links de imagens, modais, PIX e validação/preparação das mensagens dos formulários.
Ele intercepta a abertura do WhatsApp; não envia mensagens nem realiza pagamentos.

Para reproduzir, inicie `npm run dev -- --host 127.0.0.1 --port 5180` e execute
`node scripts/verify-ui.cjs`. Use `SITE_URL` se a porta for diferente e
`PLAYWRIGHT_MODULE` para apontar a uma instalação externa do Playwright.
O teste usa o Chrome instalado. Nenhuma dependência foi adicionada.
