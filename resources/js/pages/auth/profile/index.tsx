import React from 'react';
import { Head, usePage } from '@inertiajs/react';

import { PageProps } from '@/types';

import AuthLayout from '@/layouts/auth-layout';
import Header from '@/components/header';
import Wrapper from '@/components/wrapper';
import ProfileInformationForm from './partials/profile-information-form';
import UpdatePasswordForm from './partials/update-password-form';
import DeleteUserForm from './partials/delete-user-form';

interface ProfileProps extends PageProps {
  mustVerifyEmail: boolean;
}
function Profile() {
  // hooks
  const { mustVerifyEmail } = usePage<ProfileProps>().props;

  return (
    <AuthLayout>
      <Head title="Profile" />
      <Header header="Profile" />

      <Wrapper>
        <ProfileInformationForm mustVerifyEmail={mustVerifyEmail} />
      </Wrapper>

      <Wrapper>
        <UpdatePasswordForm />
      </Wrapper>

      <Wrapper className="pb-10">
        <DeleteUserForm />
      </Wrapper>
    </AuthLayout>
  );
}

export default Profile;
