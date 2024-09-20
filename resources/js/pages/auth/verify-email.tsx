import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import GuestLayout from '@/layouts/guest-layout';
import { Icons } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button, buttonVariants } from '@/components/ui/button';

interface VerifyEmailProps {
  status?: string;
}
function VerifyEmail({ status }: VerifyEmailProps) {
  // hooks
  const { post, processing } = useForm({});

  // states
  const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

  // events
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route('verification.send'));
  };
  return (
    <GuestLayout>
      <Head title="Email Verification" />

      <div className="flex min-h-screen flex-col items-center justify-start md:justify-center">
        <Card className="w-full rounded-none md:w-1/4 md:rounded-lg">
          <CardContent className="space-y-5 overflow-hidden p-5">
            <div className="flex h-full w-full items-center justify-center">
              <Link
                href={route('home')}
                className="flex justify-center gap-2 text-center"
              >
                <Icons.Logo className="h-8 w-auto dark:fill-white" />
                <h1 className="text-xl font-bold">{appName}</h1>
              </Link>
            </div>

            <Separator />

            <p className="text-justify text-sm text-muted-foreground">
              Thanks for signing up! Before getting started, could you verify
              your email address by clicking on the link we just emailed to you?
              If you didn&apos;t receive the email, we will gladly send you
              another.
            </p>

            {status === 'verification-link-sent' && (
              <div className="mb-5 text-sm font-medium text-green-500">
                A new verification link has been sent to the email address you
                provided during registration.
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-5 space-y-5">
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center justify-center gap-2"
                >
                  {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                  Resend Verification Email
                </Button>

                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className={buttonVariants({ variant: 'destructive' })}
                >
                  Logout
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </GuestLayout>
  );
}

export default VerifyEmail;
