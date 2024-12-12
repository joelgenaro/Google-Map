import { SummaryCard } from '@/components/custom/ProjectManagement/Details/ProjectStatus/summaryCard';
import { Bushfire, Drought, Flood, Precipitation, Seed } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Cog, FolderCheck } from 'lucide-react';

export default function ProjectStatusPage() {
  return (
    <div className="w-full flex justify-center items-center flex-1 px-6">
      <div className='w-full grid grid-cols-3 gap-6'>
        <SummaryCard title="Carbon" >
          <ul className='p-4 space-y-2 font-semibold text-xl'>
            <li className='flex justify-between'><span>Methodology</span><span><Seed /></span></li>
            <li className='flex justify-between'><span>Carbon Farming Area</span><span>200ha</span></li>
            <li className='flex justify-between'><span>tCO2/ha/yr</span><span>150</span></li>
            <li>Current status</li>
            <li>Carbon projections</li>
            <li>Carbon monitoring snapshot</li>
            <li>Methodology</li>
          </ul>
        </SummaryCard>
        <SummaryCard title="Risks">
          <div className='h-full flex flex-col py-4 px-1'>
            <h5 className='text-center font-semibold text-xl mb-4'>Risk monitoring snapshot</h5>
            <div className='flex-1 grid grid-cols-8 text-sm'>
              <ul className='grid col-span-4 grid-rows-5 gap-4'>
                <li className='text-xs text-center'><span>Hazard</span></li>
                <li className='flex gap-2'><Precipitation /><span>Precipitation</span></li>
                <li className='flex gap-2'><Drought /><span>Drought</span></li>
                <li className='flex gap-2'><Bushfire /><span>Bushfire</span></li>
                <li className='flex gap-2'><Flood /><span>Flood</span></li>
              </ul>
              <ul className='grid col-span-2 grid-rows-5 gap-4 -ml-4 mr-4'>
                <li className='text-xs text-center'>Prev 30 days</li>
                <li><Badge className='w-full justify-center text-xs px-1'>0 mm</Badge></li>
                <li><Badge className='w-full justify-center text-xs px-1'>High</Badge></li>
                <li><Badge className='w-full justify-center text-xs px-1'>Moderate</Badge></li>
                <li><Badge className='w-full justify-center text-xs px-1'>Low</Badge></li>
              </ul>
              <ul className='grid col-span-2 grid-rows-5 gap-4'>
                <li className='text-xs text-center'>Next 7 days</li>
                <li><Badge className='w-full justify-center text-xs px-1'>5 mm</Badge></li>
                <li><Badge className='w-full justify-center text-xs px-1'>High</Badge></li>
                <li><Badge className='w-full justify-center text-xs px-1'>High</Badge></li>
                <li><Badge className='w-full justify-center text-xs px-1'>Low</Badge></li>
              </ul>
            </div>
          </div>
        </SummaryCard>
        <SummaryCard title="Land Management">
          <div className='grid grid-cols-8 text-xl font-semibold p-4'>
            <ul className='grid col-span-2 grid-rows-5 gap-4'>
              <li><FolderCheck /></li>
              <li><Cog /></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <ul className='grid col-span-6 grid-rows-5 gap-4'>
              <li>Planning</li>
              <li>Infrastructure</li>
              <li>Integrity</li>
              <li>Reporting</li>
              <li>Verification</li>
            </ul>
          </div>
        </SummaryCard>
      </div>
    </div>
  );
}
