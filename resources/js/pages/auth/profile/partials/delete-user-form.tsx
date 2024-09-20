/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { useForm } from '@inertiajs/react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';

function DeleteUserForm() {
  // hooks
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: '',
  });

  // states
  const [open, setOpen] = React.useState<boolean>(false);
  const passwordInput = React.useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  // events
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => setOpen(false),
      onError: () => {
        passwordInput.current?.focus();
        setOpen(true);
      },
      onFinish: () => reset(),
    });
  };

  return (
    <section id="profile-information-form">
      <header>
        <h2 className="text-lg font-medium">Delete Account</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
      </header>

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            clearErrors();
            reset();
          }
        }}
      >
        <DialogTrigger asChild className="mt-5">
          <Button variant="destructive">DELETE ACCOUNT</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <Label htmlFor="password">Confirm Your Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  ref={passwordInput}
                  type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  autoFocus
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

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  clearErrors();
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={processing}
                className="inline-flex items-center gap-2"
              >
                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete My Account
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default DeleteUserForm;
