import React from 'react';
import Head from 'next/head';
import LayoutWrapper from '@iso/components/utility/layoutWrapper'
import CaseFilesTable from '../components/cases/CaseFilesTable';

import DashboardLayout from '../containers/DashboardLayout/DashboardLayout';
// import Widgets from '@iso/containers/Widgets/Widgets';

const Home = () => (
  <>
    <Head>
      <title>Telos Arbitration</title>
    </Head>
    <DashboardLayout>
      <LayoutWrapper>
        <CaseFilesTable />
      </LayoutWrapper>
    </DashboardLayout>
  </>
);

export default Home