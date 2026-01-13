# --- Build Stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Paket dosyalarını kopyala
COPY package.json package-lock.json ./

# Bağımlılıkları yükle
RUN npm ci

# Tüm kaynak kodu kopyala
COPY . .

# Projeyi derle (dist klasörü oluşur)
RUN npm run build

# --- Production Stage ---
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Build aşamasından çıkan dist klasörünü Nginx'in sunacağı yere kopyala
COPY --from=build /app/dist .

# Özel nginx ayar dosyasını kopyala (SPA routing için önemli)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
