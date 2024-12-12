import {
  CarbonMethodsCheckboxIconNames,
  CheckboxIconMappings,
} from '@/lib/types/filter-bar.type';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ComponentType } from 'react';
import { Video as DefaultIconSvg } from '../icons';
import { Checkbox } from '../ui/checkbox';

interface CheckboxAsIconProps {
  iconName: string;
  checked: boolean | undefined;
  onChange: (checked: CheckedState) => void;
}

const isValidIconName = (
  key: any,
  map: { [key in CarbonMethodsCheckboxIconNames]: ComponentType }
): key is CarbonMethodsCheckboxIconNames => {
  return key in map;
};

const CheckboxAsIcon = ({
  iconName,
  checked,
  onChange,
}: CheckboxAsIconProps) => {
  const validIconName = isValidIconName(iconName, CheckboxIconMappings)
    ? iconName
    : null;
  const IconComponent = validIconName
    ? CheckboxIconMappings[validIconName]
    : DefaultIconSvg;

  return (
    <Checkbox
      className={`rounded-xl p-2 ${checked ? 'bg-primary' : 'bg-gray-400'}`}
      checked={checked}
      onCheckedChange={onChange}
    >
      <IconComponent
        className={`h-7 w-7 ${checked ? 'fill-white' : 'fill-primary'}`}
      />
    </Checkbox>
  );
};

export default CheckboxAsIcon;
