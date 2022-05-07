import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import LayoutWrapper from '@iso/components/utility/layoutWrapper'
import { Row, Col } from 'antd'
import DashboardLayout from '../../containers/DashboardLayout/DashboardLayout'
import basicStyle from "@iso/assets/styles/constants"
import ClaimsTable from '../../components/cases/ClaimsTable';
import { FETCH_CASE_FILES } from '../../constants/case';
import { FETCH_CLAIMS } from '../../constants/claim';
import { CaseFile, Claim, Config } from '../../types/';
import CaseFilesTable from '../../components/cases/CaseFilesTable';
import { FETCH_CONFIG } from '../../constants';

const { rowStyle, colStyle } = basicStyle

type Props = {
  caseFiles: CaseFile[],
  claims: Claim[],
  config: Config
}

function CaseFiles({ claims, caseFiles, config }: Props) {
  const [caseFile] = caseFiles
  const { case_id } = caseFile


  return (
    <>
      <Head>
        <title>Case Files | Telos Arbitration</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          <Row style={rowStyle} gutter={24}>
					  <Col md={24} sm={24} xs={24} style={colStyle}>
              <CaseFilesTable caseFiles={caseFiles} config={config} case_id={case_id} />
            </Col>
          </Row>
          <br /><br />
          <Row style={rowStyle} gutter={24}>
					  <Col md={24} sm={24} xs={24} style={colStyle}>
              <ClaimsTable case_id={case_id} caseFile={caseFile} claims={claims} />
            </Col>
          </Row>
        </LayoutWrapper>
      </DashboardLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { params: { case_id } } = context
	const caseFilesPromise = FETCH_CASE_FILES(case_id)
	const claimsPromise = FETCH_CLAIMS(case_id)
  const configPromise = FETCH_CONFIG()
	const [caseFiles, claims, config] = await Promise.all([caseFilesPromise, claimsPromise, configPromise])

	return {
		props: {
      caseFiles,
			claims,
      config
		}
	}
}

export default CaseFiles