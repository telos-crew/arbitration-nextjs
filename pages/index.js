import React from 'react';
import Head from 'next/head';

import DashboardLayout from '../containers/DashboardLayout/DashboardLayout';
import Widgets from '@iso/containers/Widgets/Widgets';

const Home = () => (
  <>
    <Head>
      <title>Daoable - Home</title>
    </Head>
    <DashboardLayout>
      <Widgets />
    </DashboardLayout>
  </>
);

export default Home