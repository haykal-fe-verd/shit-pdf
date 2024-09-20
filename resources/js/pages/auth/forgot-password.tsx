import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import GuestLayout from '@/layouts/guest-layout';
import { Icons } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface ForgotPasswordProps {
  status?: string;
}
function ForgotPassword({ status }: ForgotPasswordProps) {
  // hooks
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  // states
  const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

  // events
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route('password.email'));
  };
  return (
    <GuestLayout>
      <Head title="Forgot Password" />

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
              Forgot your password? No problem. Just let us know your email
              address and we will email you a password reset link that will
              allow you to choose a new one.
            </p>

            {status && (
              <div className="mb-5 text-sm font-medium text-green-500">
                {status}
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-5 space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="example@mail.com"
                  autoFocus
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="inline-flex w-full items-center justify-center gap-2"
              >
                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                Email Password Reset Link
              </Button>
            </form>

            <p className="text-center text-xs">
              Remembered?{' '}
              <Link
                href={route('login')}
                className="text-indigo-500 hover:underline"
              >
                Login here.
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </GuestLayout>
  );
}

export default ForgotPassword;
