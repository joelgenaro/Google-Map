import { useSeedsNearMeContext } from '@/components/context/SeedsNearMeContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface SpeciesData {
  id: number;
  species: string;
  commonName: string;
}

export interface SeedSpeciesData {
  id: number;
  seedSpecies: string;
  selected: boolean;
  quantity: number;
}

export type SeedRequestForm = {
  species: SeedSpeciesData[];
};

const useSeedSpeciesData = (
  seedsSpeciesList: SpeciesData[],
  seedsRequestData: SeedSpeciesData[]
) => {
  const { setSeedsRequestData, setMissingQuantity } = useSeedsNearMeContext();
  const [missingQuantitySeeds, setMissingQuantitySeeds] = useState<string[]>(
    []
  );

  const mergedData = useMemo(() => {
    return seedsSpeciesList.map((species) => {
      const existingSeedRequest = seedsRequestData.find(
        (req) => req.seedSpecies === species.species
      );
      return existingSeedRequest
        ? {
            id: species.id,
            seedSpecies: species.species,
            selected: existingSeedRequest.selected,
            quantity: existingSeedRequest.quantity,
          }
        : {
            id: species.id,
            seedSpecies: species.species,
            selected: false,
            quantity: 0,
          };
    });
  }, [seedsSpeciesList, seedsRequestData]);

  const { control, watch, setValue, getValues } = useForm<SeedRequestForm>({
    defaultValues: { species: mergedData },
  });

  const allFormValues = watch('species');

  const checkMissingQuantities = useCallback(
    (formValues: SeedSpeciesData[]) => {
      const missingSeeds = formValues
        .filter((item) => item.selected && item.quantity <= 0)
        .map((item) => item.seedSpecies);

      setMissingQuantitySeeds(missingSeeds);
      setMissingQuantity(missingSeeds.length > 0);
    },
    [setMissingQuantity]
  );

  useEffect(() => {
    setSeedsRequestData(allFormValues);
    checkMissingQuantities(allFormValues);
  }, [allFormValues, setSeedsRequestData, checkMissingQuantities]);

  const handleQuantityChange = useCallback(
    (index: number, quantity: number) => {
      setValue(`species.${index}.quantity`, quantity, { shouldValidate: true });
      if (quantity > 0) {
        setValue(`species.${index}.selected`, true, { shouldValidate: true });
      }
      const currentValues = getValues('species');
      checkMissingQuantities(currentValues);
    },
    [setValue, getValues, checkMissingQuantities]
  );

  const handleSelectionChange = useCallback(
    (index: number, selected: boolean) => {
      setValue(`species.${index}.selected`, selected, { shouldValidate: true });
      if (selected && getValues(`species.${index}.quantity`) === 0) {
        setTimeout(() => {
          const quantityInput = document.getElementById(`quantity-${index}`);
          if (quantityInput) {
            quantityInput.focus();
          }
        }, 100);
      }
      const currentValues = getValues('species');
      checkMissingQuantities(currentValues);
    },
    [setValue, getValues, checkMissingQuantities]
  );

  return {
    control,
    mergedData,
    missingQuantitySeeds,
    handleQuantityChange,
    handleSelectionChange,
  };
};

export default useSeedSpeciesData;
