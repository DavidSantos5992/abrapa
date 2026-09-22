# ADR 0001 — Fonte editorial oficial e identidade vermelha

## Status

Parcialmente substituído em 21/09/2026 pela orientação explícita do usuário:
preservar a estrutura e o design de `pixel-perfect-canvas-199`. A proposta de
nova paleta e navegação abaixo é histórica. A exigência de fontes oficiais permanece.

## Contexto

O projeto de referência contém textos, imagens, dados, cores e nomes de outra
instituição. A nova interface precisa ser reconhecivelmente ABRAPA, sem
inventar informações e sem transportar a identidade anterior.

## Decisão

O site será construído a partir do conteúdo público do site oficial da ABRAPA e
do Instagram `@abrapa_jundiai`. A marca original será preservada, mas a
interface usará uma paleta própria baseada em variações de vermelho, vermelho
profundo, coral, branco e neutros.

Projetos, campanhas, eventos, doações e dados de contato só serão publicados
quando houver respaldo nas fontes oficiais. Dados ausentes ficam fora da
primeira versão ou recebem placeholder explícito, nunca números inventados.

## Consequências

- A arquitetura e os componentes podem ser reaproveitados, mas o conteúdo e os
  tokens visuais devem ser substituídos.
- Imagens oficiais podem ser versionadas localmente para estabilidade e
  desempenho, preservando proporção e texto alternativo.
- A área de doações precisa de conferência final dos dados antes de publicação.
- O Instagram será uma referência visual e um link de saída, não uma dependência
  de runtime.
