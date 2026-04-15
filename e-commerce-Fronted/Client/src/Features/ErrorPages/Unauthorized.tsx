import ErrorLayout from "./ErrorLayout";

export default function Unauthorized() {
  return (
    <ErrorLayout
      code={401}
      title="Yetkisiz Erişim"
      description="Bu sayfayı görüntülemek için yetkiniz yok."
    />
  );
}
