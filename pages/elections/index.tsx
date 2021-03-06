import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import LayoutWrapper from '@iso/components/utility/layoutWrapper'
import { Row, Col } from 'antd'
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout'
import ElectionsTable from '../../components/elections/ElectionsTable';
import { FETCH_ELECTIONS, FETCH_NOMINEES, FETCH_CONFIG, FETCH_ARBITRATORS } from '../../constants';
import { Election, Nominee, Config, Arbitrator } from '../../types';
import NomineesTable from '../../components/elections/NomineesTable';
import basicStyle from "@iso/assets/styles/constants"

const { rowStyle, colStyle } = basicStyle

type Props = {
  elections: Election[],
  nominees: Nominee[],
  arbitrators: Arbitrator[],
  config: Config
}

function Elections({ elections, nominees, config, arbitrators }: Props) {
  return (
    <>
      <Head>
        <title>Elections | Telos Arbitration</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <Row style={rowStyle} gutter={24}>
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <NomineesTable nominees={nominees} elections={elections} config={config} />
            </Col>
          </Row>
          <Row style={rowStyle} gutter={24}>
			      <Col md={24} sm={24} xs={24} style={colStyle}>
              <ElectionsTable elections={elections} />
            </Col>          
          </Row>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  )
}

export async function getServerSideProps() {
  const electionsPromise = FETCH_ELECTIONS()
  const nomineesPromise = FETCH_NOMINEES()
  const configPromise = FETCH_CONFIG()
  const arbitratorsPromise = FETCH_ARBITRATORS()
  const [elections, nominees, config, arbitrators] = await Promise.all([electionsPromise, nomineesPromise, configPromise, arbitratorsPromise])

	return {
		props: {
			elections,
      nominees,
      config,
      arbitrators
		}
	}
}

export default Elections