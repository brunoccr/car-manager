"use client";

import { Drawer, DrawerItem } from "@/components/ui/Drawer";
import { logout, getUserInfo, GetUserInfoResult } from "../../actions/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CarIcon, HomeIcon, KeyRoundIcon, LayoutListIcon } from "lucide-react";

export default function AppDrawer({
  title,
  subtitle,
  showFilter = true,
  showFilterCar = true,
  onFilterChangeAction = () => {},
}: {
  title: string;
  subtitle?: string;
  showFilter?: boolean;
  showFilterCar?: boolean;
  onFilterChangeAction?: (filter: string) => void;
}) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<GetUserInfoResult | null>(null);

  useEffect(() => {
    getUserInfo().then((info) => setUserInfo(info));
  }, []);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <Drawer
      title={title}
      subtitle={subtitle}
      username={userInfo?.name || ""}
      vehicles={userInfo?.vehicles}
      showFilter={showFilter}
      showFilterCar={showFilterCar}
      onFilterChange={onFilterChangeAction}
    >
      <DrawerItem title="Início" route="/dashboard" icon={<HomeIcon />} />
      <DrawerItem
        title="Atividades"
        route="/activities"
        icon={<LayoutListIcon />}
      />
      <DrawerItem title="Garagem" route="/garage" icon={<CarIcon />} />
      <DrawerItem
        title="Alterar Senha"
        route="/profile/change-password"
        icon={<KeyRoundIcon />}
      />
      <DrawerItem title="Sair" variant="button" onClick={handleLogout} />
    </Drawer>
  );
}
