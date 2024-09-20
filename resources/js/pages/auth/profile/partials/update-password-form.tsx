/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-shadow */

import React from 'react';
import { useForm } from '@inertiajs/react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Transition } from '@headlessui/react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

function UpdatePasswordForm() {
  // hooks
  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    });

  // states
  const passwordInput = React.useRef<HTMLInputElement>(null);
  const currentPasswordInput = React.useRef<HTMLInputElement>(null);
  const [showPasswordCurrent, setShowPasswordCurrent] =
    React.useState<boolean>(false);
  const [showPasswordNew, setShowPasswordNew] = React.useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    React.useState<boolean>(false);

  // events
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <section id="update-password-form">
      <header>
        <h2 className="text-lg font-medium">Update Password</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>
      <form onSubmit={onSubmit} className="mt-5 space-y-5">
        {/* optional warning browser */}
        <input
          type="text"
          autoComplete="username"
          id="username"
          name="username"
          className="hidden"
          disabled
          readOnly
        />

        <div>
          <Label htmlFor="current_password">Current Password</Label>
          <div className="relative">
            <Input
              id="current_password"
              ref={currentPasswordInput}
              type={showPasswordCurrent ? 'text' : 'password'}
              value={data.current_password}
              placeholder="••••••••"
              autoComplete="current-password"
              onChange={(e) => setData('current_password', e.target.value)}
            />
            <div
              onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
              className="absolute inset-y-0 right-0 flex items-center rounded-r bg-primary p-3 text-primary-foreground hover:cursor-pointer"
            >
              {showPasswordCurrent ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </div>
          </div>

          <InputError message={errors.current_password} className="mt-2" />
        </div>

        <div>
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              ref={passwordInput}
              type={showPasswordNew ? 'text' : 'password'}
              value={data.password}
              placeholder="••••••••"
              autoComplete="new-password"
              onChange={(e) => setData('password', e.target.value)}
            />
            <div
              onClick={() => setShowPasswordNew(!showPasswordNew)}
              className="absolute inset-y-0 right-0 flex items-center rounded-r bg-primary p-3 text-primary-foreground hover:cursor-pointer"
            >
              {showPasswordNew ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </div>
          </div>

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div>
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <div className="relative">
            <Input
              id="password_confirmation"
              type={showPasswordConfirm ? 'text' : 'password'}
              value={data.password_confirmation}
              placeholder="••••••••"
              autoComplete="new-password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
            />
            <div
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute inset-y-0 right-0 flex items-center rounded-r bg-primary p-3 text-primary-foreground hover:cursor-pointer"
            >
              {showPasswordConfirm ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </div>
          </div>

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center gap-5">
          <Button
            type="submit"
            disabled={processing}
            className="inline-flex items-center justify-center gap-2"
          >
            {processing && <Loader2 className="h-4 w-4 animate-spin" />}
            Save
          </Button>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-primary">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}

export default UpdatePasswordForm;
