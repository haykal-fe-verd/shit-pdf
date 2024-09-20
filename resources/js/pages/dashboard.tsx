import React from 'react';
import { Head } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import Header from '@/components/header';
import Wrapper from '@/components/wrapper';

function Dashboard() {
  return (
    <AuthLayout>
      <Head title="Dashboard" />
      <Header header="Dashboard" />

      <Wrapper>
        <div>Welcome to your dashboard! 🚀</div>
      </Wrapper>
    </AuthLayout>
  );
}

export default Dashboard;
