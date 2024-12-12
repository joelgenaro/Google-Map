'use client';

import { useFetchSeedsSpecies } from '@/components/hooks/useFetchSeedsSpecies';
import { SeedSpeciesData } from '@/components/hooks/useSeedsSpeciesData';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FeatureCollection } from 'geojson';
import { Eye } from 'lucide-react';
import InteractiveMap from './Common/InteractiveMap';

interface SeedsSpeciesSheetProps {
  seedsSpecies: SeedSpeciesData[];
  geoJsonData: FeatureCollection | null;
}

const SeedsSpeciesSheet = ({
  seedsSpecies,
  geoJsonData,
}: SeedsSpeciesSheetProps) => {
  const { seedsSpeciesList, error, loading } =
    useFetchSeedsSpecies(geoJsonData);

  return loading ? (
    <Skeleton className="h-10 w-[102px]" />
  ) : (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Eye className="mr-2" />
          Show
        </Button>
      </SheetTrigger>
      <SheetContent className="max-h-screen min-h-screen md:min-w-2/3">
        <SheetHeader>
          <SheetTitle>Seeds Species</SheetTitle>
          <SheetDescription>
            List of seeds requested, quantity and location on the map
          </SheetDescription>
        </SheetHeader>
        <div className="flex-column mt-2 flex min-h-[calc(100vh-7rem)] gap-4 lg:flex-row">
          <div className="max-h-[calc(100vh-7rem)] w-2/5 overflow-auto">
            <div className="w-full rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Species Name</TableHead>
                    <TableHead>Common Name</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seedsSpecies.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.seedSpecies}</TableCell>
                      <TableCell>
                        {seedsSpeciesList.find(
                          (data) => data.species === item.seedSpecies
                        )?.commonName || 'N/A'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex w-3/5">
            <InteractiveMap geoJsonData={geoJsonData} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SeedsSpeciesSheet;
