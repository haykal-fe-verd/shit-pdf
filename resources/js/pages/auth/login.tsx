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
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { Separator } from '@/components/ui/separator';
import { Button, buttonVariants } from '@/components/ui/button';

interface LoginProps {
  canResetPassword: boolean;
}
function Login({ canResetPassword }: LoginProps) {
  // hooks
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  // states
  const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  // events
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };
  return (
    <GuestLayout>
      <Head title="Login" />

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

              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="remember"
                    name="remember"
                    onCheckedChange={(e) => setData('remember', Boolean(e))}
                    checked={data.remember}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>

                {canResetPassword && (
                  <Link
                    href={route('password.request')}
                    className={buttonVariants({ variant: 'link' })}
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="inline-flex w-full items-center justify-center gap-2"
              >
                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>

            <p className="text-center text-xs">
              Dont have an account?{' '}
              <Link
                href={route('register')}
                className="text-indigo-500 hover:underline"
              >
                Register here.
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </GuestLayout>
  );
}

export default Login;
