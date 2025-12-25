import ErrorLayout from "./ErrorLayout";

export default function ServerError() {
  return (
    <ErrorLayout
      code={500}
      title="Sunucu Hatası"
      description="Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin."
    />
  );
}
