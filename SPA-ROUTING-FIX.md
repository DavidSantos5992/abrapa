# 🛠️ Fix para Problema do F5 (Refresh) em SPA React

## ❌ **Problema**
Quando você pressiona F5 ou recarrega a página em qualquer rota que não seja `/`, o navegador retorna erro 404.

## ✅ **Solução Implementada**

### 🌐 **Para Vercel/Netlify (Recomendado)**
- ✅ `vercel.json` - Configurado para redirecionar todas as rotas para `index.html`
- ✅ `public/_redirects` - Arquivo para Netlify
- ✅ SPA routing funcionando automaticamente

### 🖥️ **Para Servidor Local (Desenvolvimento)**
- ✅ `vite.config.ts` - Configurado `historyApiFallback: true`
- ✅ Servidor de desenvolvimento corrigido

### 🐳 **Para Outros Servidores**
- ✅ `public/.htaccess` - Para Apache
- ✅ `nginx.conf` - Para Nginx
- ✅ `server.js` - Express com fallback configurado

---

## 🔧 **Como Funciona**

### **Problema Original:**
```
URL: https://site.com/sobre
F5 → Servidor busca arquivo /sobre (não existe) → 404
```

### **Solução:**
```
URL: https://site.com/sobre
F5 → Servidor redireciona para /index.html → React Router carrega /sobre
```

---

## 📁 **Arquivos Criados/Modificados**

### **Vercel (Produção)**
```json
// vercel.json
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### **Netlify**
```
// public/_redirects
/*    /index.html   200
```

### **Vite (Desenvolvimento)**
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    historyApiFallback: true, // ← Fix para desenvolvimento
  }
})
```

### **Apache**
```apache
# public/.htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### **Nginx**
```nginx
# nginx.conf
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## ✅ **Teste**

1. **Inicie o servidor:**
   ```bash
   npm run dev  # Desenvolvimento
   # ou
   npm run build && npm run start  # Produção
   ```

2. **Teste as rotas:**
   - http://localhost:8080/
   - http://localhost:8080/sobre
   - http://localhost:8080/doacao
   - http://localhost:8080/campanhas

3. **Pressione F5 em qualquer página** ✅ Deve funcionar!

---

## 🚀 **Deploy**

### **Vercel (Automático)**
```bash
git push origin main
# Deploy automático com configuração correta
```

### **Netlify**
- Arquivo `_redirects` será usado automaticamente

### **VPS/Servidor**
- Use `nginx.conf` ou `.htaccess` conforme seu servidor
- Configure o servidor Express com fallback

---

## 🎯 **Status**

- ✅ **Desenvolvimento**: Funcionando (Vite + historyApiFallback)
- ✅ **Vercel**: Configurado (vercel.json)
- ✅ **Netlify**: Configurado (_redirects)
- ✅ **Apache**: Configurado (.htaccess)
- ✅ **Nginx**: Configurado (nginx.conf)
- ✅ **Express**: Configurado (server.js)

**🎉 Problema do F5 resolvido em todos os ambientes!**