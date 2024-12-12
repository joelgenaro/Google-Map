import { StepItem } from '@/components/ui/stepper';
import { CircleHelp, MapPin, SquarePen } from 'lucide-react';
import { ComponentType, SVGProps, forwardRef } from 'react';

// Defining the type for the icon components from Lucide
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

// Higher-Order Component to create icons with specified colors
const createColoredIcon = (IconComponent: IconComponent, color: string) => {
  return forwardRef<SVGSVGElement, any>((props, ref) => (
    <IconComponent ref={ref} color={color} {...props} />
  ));
};

// Create icon instances with specific colors
const WhiteMapPin = createColoredIcon(MapPin, '#ffffff');
const WhiteSquarePen = createColoredIcon(SquarePen, '#ffffff');
const WhiteCircleHelp = createColoredIcon(CircleHelp, '#ffffff');

const DarkBlueMapPin = createColoredIcon(MapPin, '#323172');
const DarkBlueSquarePen = createColoredIcon(SquarePen, '#323172');
const DarkBlueCircleHelp = createColoredIcon(CircleHelp, '#323172');

// You can also dynamically select icons based on some condition or configuration
export const getStepIcon = (
  stepId: string | undefined,
  colorScheme: 'white' | 'darkBlue'
): React.ComponentType<any> => {
  const iconMap: { [key: string]: { [key: string]: IconComponent } } = {
    white: {
      'step-one-add-location': WhiteMapPin,
      'step-two-request-seed': WhiteSquarePen,
      default: WhiteCircleHelp,
    },
    darkBlue: {
      'step-one-add-location': DarkBlueMapPin,
      'step-two-request-seed': DarkBlueSquarePen,
      default: DarkBlueCircleHelp,
    },
  };
  return !stepId
    ? iconMap[colorScheme]['default']
    : iconMap[colorScheme][stepId];
};

export const seedsNearMeSteps: StepItem[] = [
  {
    id: 'step-one-add-location',
    label: 'Add location',
    icon: getStepIcon('step-one-add-location', 'darkBlue'),
  },
  {
    id: 'step-two-request-seed',
    label: 'Request seed',
    icon: getStepIcon('step-two-request-seed', 'darkBlue'),
  },
];
