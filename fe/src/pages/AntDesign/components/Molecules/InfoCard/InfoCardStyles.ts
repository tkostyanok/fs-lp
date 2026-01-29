import { WHITE } from 'src/pages/AntDesign/constants/colors';

export const INFO_CARD_STYLES = (iconColor: string) =>  {
  return {
    'card': {
      root: {
        backgroundColor: WHITE,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '8px',
        // minWidth: 250,
        width: '100%',
      },
      body: {
        padding: '0px 16px 16px',
      },
      header: {
        borderBottom: 'none'
      },
      title: {
        fontWeight: 400,
      }
    },
    'icon': {
      color: iconColor,
      fontSize: '32px'
    },
    'meta': {
      title: {
        fontSize: '32px',
      }
    }
  };
};