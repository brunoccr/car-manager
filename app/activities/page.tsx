import { ActivityList } from "@/components/ui/ActivityList";
import { Suspense } from "react";
import AppDrawer from "../components/AppDrawer";

const Loading = () => {
  return <h1>Carregando...</h1>;
};

export default function Activities() {
  return (
    <div>
      <AppDrawer title="Atividades" />
      <Suspense fallback={<Loading />}>
        <ActivityList filter="TESTE" />
      </Suspense>
    </div>
  );
}
