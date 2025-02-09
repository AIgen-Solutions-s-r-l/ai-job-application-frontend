import { Suspense } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { FileUser, User } from 'lucide-react';
import { fetchProfileData, fetchIntegrationsData } from '@/libs/data';
import Profile from '@/components/settings/profile';
import Integrations from '@/components/settings/integrations';
import Passes from '@/components/settings/passes';
import { getPlans } from '@/libs/pricing/data';
import { UserPlan } from '@/components/subscription/types';
import { ChangePassword } from '@/components/settings/ChangePassword';
import { PersonalInfo } from '@/components/settings/PersonalInfo';

/*
  You have to have one page to change e-mail and password, and a second page 
  to change the personal_information that is asked during onbording (main resume)
*/

const triggerClass =
  'py-4 flex gap-3 whitespace-nowrap data-[state=active]:font-bold- rounded-t-md bg-neutral-content data-[state=active]:bg-white';
const tabClass =
  'min-h-[calc(100vh-220px)] p-5 data-[state=active]:flex flex-col gap-4 bg-white';

export default function SettingsPage() {
  // const profileData = await fetchProfileData();
  // const integrationData = await fetchIntegrationsData();
  // const userPlan: UserPlan = await getPlans();

  return (
    <Tabs.Root className='h-full-' defaultValue='profile'>
      <Tabs.List className='flex gap-[10px] text-lg' aria-label='Profile data'>
        <Tabs.Trigger className={`${triggerClass} px-14`} value='profile'>
          <User />
          Edit profile
        </Tabs.Trigger>
        <Tabs.Trigger className={`${triggerClass} pl-9 grow`} value='info'>
          <FileUser />
          Personal info
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content className={tabClass} value='profile'>
        {/* <Profile profileData={profileData} /> */}
        <ChangePassword username='' />
      </Tabs.Content>
      <Tabs.Content className={tabClass} value='info'>
        {/* <Integrations integrationData={integrationData} /> */}
        {/* <Passes userPlan={userPlan} /> */}
        <Suspense fallback={<>Skeleton</>}>
          <PersonalInfo />
        </Suspense>
      </Tabs.Content>
    </Tabs.Root>
  );
}
