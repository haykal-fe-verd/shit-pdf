import React from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

import { PageProps } from '@/types';
import { useThemeStore, applyTheme } from '@/stores/use-theme-store';

import { Toaster } from '@/components/ui/sonner';
import Topbar from '@/layouts/partials/topbar';

function AuthLayout({ children }: React.PropsWithChildren) {
  // hooks
  const { status, success, error, message } = usePage<PageProps>().props;
  const theme = useThemeStore((state) => state.theme);

  // render
  React.useEffect(() => {
    applyTheme(theme);

    if (status) {
      toast.info(status);
    }

    if (success) {
      toast.success(success);
    }

    if (error) {
      toast.error(error);
    }

    if (message) {
      toast.message('Message:', {
        description: message,
      });
    }
  }, [status, success, error, message, theme]);

  return (
    <>
      <main>
        <Topbar />
        <div>{children}</div>
      </main>
      <Toaster
        position="top-right"
        richColors
        duration={3000}
        closeButton
        theme={theme}
      />
    </>
  );
}

export default AuthLayout;
