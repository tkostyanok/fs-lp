import { Link } from 'react-router';

import {
  Col, Row
} from 'antd';
import { MoveRight } from 'lucide-react';
import {
  ERROR_COLOR,
  PRIMARY_COLOR, SUCCESS_COLOR,
  WARNING_COLOR
} from 'src/pages/AntDesign/constants/colors';
import {
  EuroOutlined, IssuesCloseOutlined, ScheduleOutlined, TeamOutlined
} from '@ant-design/icons';

import { InfoCard } from '../../Molecules';

import { NUTRITIONIST_DASHBOARD_STYLES } from './NutritionistDashboardStyles';


export const NutritionistDashboard = () => {
  const CARD_DATA = {
    'appointmentsToday': 150,
    'needsAttention': 10,
    'totalBillingAmount': 598,
    'totalClients': 45,
  };

  return (
    <Row justify='center'>
      <Col
        xs={24}
        md={12}
        xl={6}
        style={NUTRITIONIST_DASHBOARD_STYLES.col}
      >
        <InfoCard
          iconColor={PRIMARY_COLOR}
          Icon={TeamOutlined}
          metaDescription={
            <Link
              style={{
                color: PRIMARY_COLOR,
                ...NUTRITIONIST_DASHBOARD_STYLES.link
              }}
              to='/ant-design/nutritionist/patients'
            >
              View all patients
              <MoveRight
                style={{
                  marginLeft: '4px' 
                }}
              />
            </Link>
          }
          metaTitle={`${CARD_DATA.totalClients}`}
          title='Total clients'
        />
      </Col>
      <Col
        xs={24}
        md={12}
        xl={6}
        style={NUTRITIONIST_DASHBOARD_STYLES.col}
      >
        <InfoCard
          iconColor={SUCCESS_COLOR}
          Icon={ScheduleOutlined}
          metaDescription={
            <Link
              style={{
                color: SUCCESS_COLOR,
                ...NUTRITIONIST_DASHBOARD_STYLES.link
              }}
              to='/ant-design/nutritionist/appointments'
            >
              View appointments
              <MoveRight
                style={{
                  marginLeft: '4px' 
                }}
              />
            </Link>
          }
          metaTitle={`${CARD_DATA.appointmentsToday}`}
          title='Appointments today'
        />
      </Col>
      <Col
        xs={24}
        md={12}
        xl={6}
        style={NUTRITIONIST_DASHBOARD_STYLES.col}
      >
        <InfoCard
          iconColor={WARNING_COLOR}
          Icon={IssuesCloseOutlined}
          metaDescription='Go to treatments'
          metaTitle={`${CARD_DATA.needsAttention}`}
          title='Needs attention'
        />
      </Col>
      <Col
        xs={24}
        md={12}
        xl={6}
        style={NUTRITIONIST_DASHBOARD_STYLES.col}
      >
        <InfoCard
          iconColor={ERROR_COLOR}
          Icon={EuroOutlined}
          metaDescription='Go to billing details'
          metaTitle={`${CARD_DATA.totalBillingAmount}`}
          title='Total billing amount'
        />
      </Col>
    </Row>
  );
};
