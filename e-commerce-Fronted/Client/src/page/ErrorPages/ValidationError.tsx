import ErrorLayout from "./ErrorLayout";

export default function ValidationError() {
  return (
    <ErrorLayout
      code={422}
      title="Doğrulama Hatası"
      description="Girilen bilgiler doğrulama kurallarını karşılamıyor."
    />
  );
}
