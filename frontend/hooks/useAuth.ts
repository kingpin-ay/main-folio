import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { appClient } from "@/lib/client/appClient";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await appClient.verify();
        return response.status === 200 && response.data !== null;
      } catch (error) {
        return false;
      }
    };

    const handleAuth = async () => {
      const isAuthenticated = await checkAuth();
      const isLoginPage = window.location.pathname === "/login";
      const isDashboardPage = window.location.pathname.startsWith("/dashboard");

      if (!isAuthenticated && isDashboardPage) {
        router.push("/login");
      } else if (isAuthenticated && isLoginPage) {
        router.push("/dashboard");
      }
    };

    handleAuth();
  }, [router]);

  return {
    verify: async () => {
      try {
        const response = await appClient.verify();
        if (response.status !== 200 || response.data === null) {
          setTimeout(() => {
            router.replace("/login");
          }, 0);
          return false;
        }
        return true;
      } catch (error) {
        setTimeout(() => {
          router.replace("/login");
        }, 0);
        return false;
      }
    },
  };
};
