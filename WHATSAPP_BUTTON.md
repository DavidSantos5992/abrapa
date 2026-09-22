# WhatsApp Button Component

Este componente adiciona um botão flutuante do WhatsApp que aparece em todas as páginas do site.

## Características

- **Posição fixa**: Canto inferior direito
- **Responsivo**: Funciona em todos os dispositivos
- **Animação**: Efeito de ondas chamativo para atrair atenção
- **Acessibilidade**: Inclui aria-label e title para leitores de tela
- **Segurança**: Abre links com noopener e noreferrer

## Customização

### Número do WhatsApp
Para alterar o número do WhatsApp, edite o arquivo `src/components/WhatsAppButton.tsx`:

```tsx
phoneNumber = "5511999999999" // Substitua pelo seu número
```

### Mensagem padrão
Para alterar a mensagem padrão que será enviada:

```tsx
message = "Sua mensagem personalizada aqui"
```

### Usar diferentes mensagens por página
Se quiser mensagens diferentes para cada página, você pode passar as props diretamente:

```tsx
// No App.tsx ou em páginas específicas
<WhatsAppButton 
  phoneNumber="5511999999999"
  message="Mensagem específica para esta página"
/>
```

### Personalizar aparência
O botão usa classes do Tailwind CSS que podem ser modificadas:

- `bg-green-500`: Cor de fundo
- `hover:bg-green-600`: Cor ao passar o mouse
- `h-14 w-14`: Tamanho do botão
- `bottom-6 right-6`: Posição na tela

## Localização do Componente

- **Arquivo**: `src/components/WhatsAppButton.tsx`
- **Importado em**: `src/App.tsx`
- **Disponível em**: Todas as páginas do site

## Formato do Número do WhatsApp

Use o formato internacional sem símbolos:
- ✅ Correto: `5511999999999` (País + DDD + Número)
- ❌ Incorreto: `+55 (11) 99999-9999`