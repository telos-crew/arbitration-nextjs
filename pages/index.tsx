import React, { useState } from 'react';
import Head from 'next/head';
import { Row, Col } from 'antd'
import basicStyle from '@iso/assets/styles/constants';
import LayoutWrapper from '@iso/components/utility/layoutWrapper'
import CaseFilesTable from '../components/cases/CaseFilesTable'
import DashboardLayout from '../containers/DashboardLayout/DashboardLayout'
import Forms from '../containers/Forms/Forms';
import { FETCH_CONFIG } from '../constants';
import ConfigTable from '../components/config/ConfigTable';

const { rowStyle, colStyle } = basicStyle

const Home = ({ config }) => {
  return (
    <>
      <Head>
        <title>Cases | Telos Arbitration</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <Row style={rowStyle} gutter={24}>
			      <Col md={24} sm={24} xs={24} style={colStyle}>          
              <ConfigTable config={config} />
            </Col>
          </Row>
          <Row style={rowStyle} gutter={24}>
			      <Col md={24} sm={24} xs={24} style={colStyle}>          
              <CaseFilesTable />
              </Col>
            </Row>
          <Forms />
        </LayoutWrapper>
      </DashboardLayout>
    </>
  )
}

export async function getServerSideProps() {
  const config = await FETCH_CONFIG()
  console.log('config: ', config)
	return {
		props: {
      config
		}
	}
}

export default Home