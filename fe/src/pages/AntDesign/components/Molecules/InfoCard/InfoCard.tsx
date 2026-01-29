import { Card } from 'antd';
import Icon from '@ant-design/icons';

import { InfoCardProps } from './InfoCardProps';
import { INFO_CARD_STYLES } from './InfoCardStyles';

export const InfoCard = ({
  iconColor,
  Icon: InfoCardIcon,
  metaDescription,
  metaTitle,
  title
}: InfoCardProps) => {
  const STYLES = INFO_CARD_STYLES(iconColor);

  return (
    <Card
      extra={
        InfoCardIcon 
          ? (
            <Icon
              component={InfoCardIcon}
              style={STYLES.icon}
            />
          )
          : undefined
      }
      size='small'
      styles={STYLES.card}
      title={title}
      variant='borderless'
    >
      <Card.Meta
        description={metaDescription}
        styles={STYLES.meta}
        title={metaTitle}
      />
    </Card>
  );
};
