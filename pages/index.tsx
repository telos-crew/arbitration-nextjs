import React from 'react';
import Head from 'next/head';
import LayoutWrapper from '@iso/components/utility/layoutWrapper'
import CaseFilesTable from '../components/cases/CaseFilesTable'
import FileCaseForm from '../components/cases/FileCaseForm'

import DashboardLayout from '../containers/DashboardLayout/DashboardLayout'
import Forms from '../containers/Forms/Forms';
import InputField from './dashboard/inputField';
import { useSelector } from 'react-redux';
import { RootState } from '../types'
// import Widgets from '@iso/containers/Widgets/Widgets';

const Home = () => {
  const { identity } = useSelector((state: RootState) => state.auth)

  return (
    <>
      <Head>
        <title>Telos Arbitration</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          {!!identity && (
            <FileCaseForm />
          )}
          <CaseFilesTable />
          <Forms />
        </LayoutWrapper>
      </DashboardLayout>
    </>
  )
}

export default Home