import * as Tabs from '@radix-ui/react-tabs';
import { ChangePassword } from '@/components/settings/ChangePassword';
import { ChangeEmail } from '@/components/settings/ChangeEmail';
import { typography } from '@/components/typography';

export default async function SettingsPage() {
  // let profileData: JobProfile;
  try {
    // profileData = await getUserProfile();
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }

  return (
    <Tabs.Root className='h-full-' defaultValue='profile'>
      <p className='page-header'>Account Information</p>

      <Tabs.List className={typography.tabs.list} aria-label='Profile data'>
        {/* <Tabs.Trigger className={typography.tabs.trigger} value='profile'>
          <User />
          Auth
        </Tabs.Trigger> */}
        {/* <Tabs.Trigger
          className={`${typography.tabs.trigger} px-9`}
          value='info'
        >
          <FileUser />
          Personal
        </Tabs.Trigger> */}
      </Tabs.List>

      <Tabs.Content className={typography.tabs.content} value='profile'>
        <ChangePassword />
        <ChangeEmail />
      </Tabs.Content>
      {/* <Tabs.Content className={typography.tabs.content} value='info'>
        <Suspense fallback={<ProfilePersonalInformationSkeleton />}>
          <PersonalInfo jobProfile={profileData} />
        </Suspense>
      </Tabs.Content> */}
    </Tabs.Root>
  );
}
