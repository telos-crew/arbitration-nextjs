import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import LayoutWrapper from '@iso/components/utility/layoutWrapper'
import { Row, Col } from 'antd'
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout'
import { useSelector } from 'react-redux';
import { RootState } from '../../types'
import ElectionsTable from '../../components/elections/ElectionsTable';
import { FETCH_ELECTIONS, FETCH_NOMINEES, FETCH_CONFIG } from '../../constants';
import { Election, Nominee, Config } from '../../types';
import NomineesTable from '../../components/elections/NomineesTable';
import basicStyle from "@iso/assets/styles/constants"

const { rowStyle, colStyle } = basicStyle

type Props = {
  elections: Election[],
  nominees: Nominee[],
  config: Config
}

function Elections({ elections, nominees, config }: Props) {
  console.log('nominees: ', nominees)
  const { identity } = useSelector((state: RootState) => state.auth)

  return (
    <>
      <Head>
        <title>Elections | Telos Arbitration</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <Row style={rowStyle} gutter={24}>
			      <Col md={12} sm={12} xs={24} style={colStyle}>
              <NomineesTable nominees={nominees} elections={elections} config={config} />
            </Col>
          </Row>
          <ElectionsTable elections={elections} />
        </LayoutWrapper>
      </DashboardLayout>
    </>
  )
}

export async function getServerSideProps() {
  const electionsPromise = FETCH_ELECTIONS()
  const nomineesPromise = FETCH_NOMINEES()
  const configPromise = FETCH_CONFIG()
  const [elections, nominees, config] = await Promise.all([electionsPromise, nomineesPromise, configPromise])

	return {
		props: {
			elections,
      nominees,
      config
		}
	}
}

export default Elections