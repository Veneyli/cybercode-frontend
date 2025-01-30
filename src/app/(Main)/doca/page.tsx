import MainLayout from "../layout";

export default function DocaPage() {
  return (
    <MainLayout>
      <div style={{ padding: 40 + "px", textAlign: "center" }}>
        Страница документации, которая находится в разработке
      </div>
    </MainLayout>
  );
}

DocaPage.layout = MainLayout;
