import React, { useState } from 'react';
import { Tabs } from 'antd'
import Head from 'next/head';
import LayoutWrapper from '@iso/components/utility/layoutWrapper'
import CaseFilesTable from '../components/cases/CaseFilesTable'
import FileCaseForm from '../components/cases/FileCaseForm'

import DashboardLayout from '../containers/DashboardLayout/DashboardLayout'
import Forms from '../containers/Forms/Forms';
import InputField from './dashboard/inputField';
import { useSelector } from 'react-redux';
import { RootState } from '../types'
import AddClaimForm from '../components/cases/AddClaimForm';

const { TabPane } = Tabs

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
            <Tabs defaultActiveKey="1">
              <TabPane tab="File New Case" key="1">
                <FileCaseForm />
              </TabPane>
              <TabPane tab="Add / Remove Case Claim" key="2">
                <AddClaimForm />
              </TabPane>
              <TabPane tab="Delete Case" key="3">
                <AddClaimForm />
              </TabPane>
            </Tabs>            
          )}
          <CaseFilesTable />
          <Forms />
        </LayoutWrapper>
      </DashboardLayout>
    </>
  )
}

export default Home