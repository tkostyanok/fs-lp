import type {
  ComponentType, ForwardRefExoticComponent, ReactNode, SVGProps 
} from 'react';

import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export interface InfoCardProps {
  /**
   * Define color for Icon in InfoCard component. 
   */
  iconColor: string;
  /**
   * Define Icon in InfoCard component.
   */
  Icon: ComponentType<SVGProps<SVGSVGElement>> |  ForwardRefExoticComponent<CustomIconComponentProps>;
  /**
   * Description text or component for Meta component.
   * As example: Link
   */
  metaDescription?: ReactNode | string;
  /**
   * Title text for Meta component.
   */
  metaTitle: string;
  /**
   * Title text for component.
   */
  title: string
}