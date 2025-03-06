import {
  getAppliedJobApplications,
  getFailedJobApplications,
} from '@/libs/api/application';
import { JobFeedList } from '@/components/jobs/JobFeedList';

export default async function JobFeed() {
  const [appliedJobs, failedJobs] = await Promise.all([
    getAppliedJobApplications(),
    getFailedJobApplications(),
  ]);

  return (
    <div className='font-light flex flex-col gap-5 rounded-2xl font-jura'>
      <h1 className='text-3xl font-semibold'>Job Application History</h1>

      {/* todo (new disign in figma), is need redo? */}
      <div className='flex flex-col gap-5'>
        <div className='text-2xl'>
          <b>Congratulations!</b> &nbsp;
          <span>
            We sent your application to{' '}
            <b>{Object.keys(appliedJobs).length} jobs.</b>
          </span>
        </div>
      </div>

      <JobFeedList
        appliedJobs={appliedJobs}
        failedJobs={failedJobs}
        isLoading={false}
      />
    </div>
  );
}
