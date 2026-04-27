"use client";

import { Drawer, DrawerItem } from "@/components/ui/Drawer";
import { logout, getUserInfo } from "../../actions/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthRecord } from "pocketbase";
import { FilterContext } from "@/app/contexts/FilterProvider";

export default function AppDrawer() {
  const { title, subtitle } = useContext(FilterContext);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<AuthRecord>(null);

  useEffect(() => {
    getUserInfo().then((info) => setUserInfo(info));
  }, []);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <Drawer title={title} subtitle={subtitle} username={userInfo?.name}>
      <DrawerItem title="Início" route="/dashboard" />
      <DrawerItem title="Atividades" route="/activities" />
      <DrawerItem title="Sair" variant="button" onClick={handleLogout} />
    </Drawer>
  );
}
