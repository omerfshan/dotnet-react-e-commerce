# --- Build Stage ---
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Proje bağımlılık dosyalarını kopyala ve restore et
COPY ["commerce.API/commerce.API.csproj", "commerce.API/"]
COPY ["Commerce.Business/Commerce.Business.csproj", "Commerce.Business/"]
COPY ["Commerce.Core/Commerce.Core.csproj", "Commerce.Core/"]
COPY ["Commerce.DataAccess/Commerce.DataAccess.csproj", "Commerce.DataAccess/"]
COPY ["Commerce.Entity/Commerce.Entity.csproj", "Commerce.Entity/"]

RUN dotnet restore "commerce.API/commerce.API.csproj"

# Tüm kaynak kodları kopyala ve derle
COPY . .
WORKDIR "/src/commerce.API"
RUN dotnet publish "commerce.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# --- Runtime Stage ---
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5232
ENV ASPNETCORE_ENVIRONMENT=Development

EXPOSE 5232

ENTRYPOINT ["dotnet", "commerce.API.dll"]
