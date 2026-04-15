import ErrorLayout from "./ErrorLayout";

export default function BadRequest() {
  return (
    <ErrorLayout
      code={400}
      title="Geçersiz İstek"
      description="Gönderilen istekte bir hata bulunuyor."
    />
  );
}
