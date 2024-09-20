/* eslint-disable consistent-return */

import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Camera, Loader2 } from 'lucide-react';
import { Transition } from '@headlessui/react';

import { PageProps } from '@/types';
import { UpdateUser } from '@/types/user';
import { cn, getInitial } from '@/lib/utils';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ProfileInformationProps {
  mustVerifyEmail: boolean;
}

function ProfileInformationForm({ mustVerifyEmail }: ProfileInformationProps) {
  // hooks
  const { user, status } = usePage<PageProps>().props;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm<UpdateUser>({
      name: user.name,
      email: user.email,
      _method: 'PATCH',
    });

  // states
  const falbackAvatar = getInitial(user.name);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(
    user.avatar || null
  );

  // events
  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      setData('avatar', files[0]);

      const imageUrl = window.URL.createObjectURL(files[0]);
      setAvatarUrl(imageUrl);

      return () => window.URL.revokeObjectURL(imageUrl);
    }
  };

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route('profile.update'));
  };

  // render
  React.useEffect(() => {
    setAvatarUrl(user.avatar || null);
  }, [user]);

  return (
    <section id="profile-information-form">
      <header>
        <h2 className="text-lg font-medium">Profile Information</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your account&apos;s profile information and email address.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="mt-5 space-y-5"
        encType="multipart/form-data"
      >
        <div className="relative">
          {avatarUrl !== null ? (
            <img
              src={avatarUrl}
              alt={`@${user.name}`}
              className="mx-auto h-36 w-36 rounded-full border border-border object-cover"
            />
          ) : (
            <Avatar
              className={cn(
                'mx-auto h-36 w-36 rounded-full border border-border'
              )}
            >
              <AvatarFallback>{falbackAvatar}</AvatarFallback>
            </Avatar>
          )}

          <Label
            htmlFor="avatar"
            className={buttonVariants({
              size: 'icon',
              variant: 'ghost',
              className:
                'absolute bottom-1 left-1/2 -translate-x-1/2 transform rounded-full hover:cursor-pointer hover:bg-black/10',
            })}
            tabIndex={0}
          >
            <Camera className="h-5 w-5 text-white mix-blend-difference" />
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={onChangeAvatar}
              className="hidden"
              accept="image/*"
            />
          </Label>
        </div>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            autoComplete="name"
            autoFocus
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            autoComplete="email"
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-3 text-sm">
              Your email address is unverified.
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className={buttonVariants({ variant: 'link', size: 'sm' })}
              >
                Click here to re-send email.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <Transition
                show={status === 'verification-link-sent'}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <div className="mt-3 text-sm font-medium text-emerald-500">
                  A new verification link has been sent to your email address.
                </div>
              </Transition>
            )}
          </div>
        )}

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

export default ProfileInformationForm;
