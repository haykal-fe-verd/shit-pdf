/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import GuestLayout from '@/layouts/guest-layout';
import { Icons } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

function ConfirmPassword() {
  // hooks
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  // states
  const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  // events
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route('password.confirm'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

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
              This is a secure area of the application. Please confirm your
              password before continuing.
            </p>

            <form onSubmit={onSubmit} className="mt-5 space-y-5">
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={data.password}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    onChange={(e) => setData('password', e.target.value)}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center rounded-r bg-primary p-3 text-primary-foreground hover:cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </div>
                </div>

                <InputError message={errors.password} className="mt-2" />
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="inline-flex w-full items-center justify-center gap-2"
              >
                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                Confirm
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </GuestLayout>
  );
}

export default ConfirmPassword;
