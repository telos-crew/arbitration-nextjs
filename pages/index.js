import React from 'react';
import Head from 'next/head';
import LayoutWrapper from '@iso/components/utility/layoutWrapper'
import CaseFilesTable from '../components/cases/CaseFilesTable'
import FileCaseForm from '../components/cases/FileCaseForm'

import DashboardLayout from '../containers/DashboardLayout/DashboardLayout'
import Forms from '../containers/Forms/Forms';
import InputField from './dashboard/inputField';
// import Widgets from '@iso/containers/Widgets/Widgets';

const Home = () => (
  <>
    <Head>
      <title>Telos Arbitration</title>
    </Head>
    <DashboardLayout>
      <LayoutWrapper>
        <FileCaseForm />
        <CaseFilesTable />
        <Forms />
      </LayoutWrapper>
    </DashboardLayout>
  </>
);

export default Home