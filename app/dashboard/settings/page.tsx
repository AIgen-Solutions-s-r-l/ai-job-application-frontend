import { Suspense } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { FileUser, User } from 'lucide-react';
import { getUserProfile } from '@/libs/data';
import { ChangePassword } from '@/components/settings/ChangePassword';
import { PersonalInfo } from '@/components/settings/PersonalInfo';
import { ChangeEmail } from '@/components/settings/ChangeEmail';
import { JobProfile } from '@/libs/definitions';
import { typography } from '@/components/typography';
import { ProfilePersonalInformationSkeleton } from '@/components/profiles/resume-sections/ProfilePersonalInformationSkeleton';

export default async function SettingsPage() {
  let profileData: JobProfile;
  try {
    profileData = await getUserProfile();
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }

  return (
    <Tabs.Root className='h-full-' defaultValue='profile'>
      <Tabs.List className={typography.tabs.list} aria-label='Profile data'>
        <Tabs.Trigger className={typography.tabs.trigger} value='profile'>
          <User />
          Auth
        </Tabs.Trigger>
        <Tabs.Trigger
          className={`${typography.tabs.trigger} px-9`}
          value='info'
        >
          <FileUser />
          Personal
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content className={typography.tabs.content} value='profile'>
        <ChangePassword />
        <ChangeEmail />
      </Tabs.Content>
      <Tabs.Content className={typography.tabs.content} value='info'>
        <Suspense fallback={<ProfilePersonalInformationSkeleton />}>
          <PersonalInfo jobProfile={profileData} />
        </Suspense>
      </Tabs.Content>
    </Tabs.Root>
  );
}
