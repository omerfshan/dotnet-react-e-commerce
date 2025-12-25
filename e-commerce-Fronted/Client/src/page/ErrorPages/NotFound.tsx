import ErrorLayout from "./ErrorLayout";

export default function NotFound() {
  return (
    <ErrorLayout
      code={404}
      title="Sayfa Bulunamadı"
      description="Aradığınız sayfa mevcut değil ya da taşınmış olabilir."
    />
  );
}
