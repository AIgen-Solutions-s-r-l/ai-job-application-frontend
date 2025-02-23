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

  // todo: is it need???
  // if (!Object.keys(appliedJobs))
  //   return (
  //     <div className='font-light flex flex-col gap-5 rounded-2xl'>
  //       <h3 className='text-2xl'>
  //         You can search for jobs now. Let’s get rolling. This will only take a
  //         few minutes.
  //       </h3>
  //       <div className='px-8 py-[50px] flex flex-col justify-center items-center rounded-2xl bg-white'>
  //         <div className='flex flex-col items-center gap-6'>
  //           <h2 className='text-lg font-light'>
  //             You don’t have any applied jobs yet.
  //           </h2>
  //           <Link
  //             className={
  //               'font-medium text-xl px-[60px] py-3 border border-input bg-white hover:bg-primary rounded-full'
  //             }
  //             href='/search'
  //           >
  //             Find a Job
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );

  return (
    <div className='h-full font-light flex flex-col gap-5 rounded-2xl'>
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
