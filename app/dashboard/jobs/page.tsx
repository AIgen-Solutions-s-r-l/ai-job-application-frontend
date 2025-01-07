import { Suspense } from "react";
import { JobFeedList } from "@/components/jobs/job-feed-list";
import LogoutAndRedirect from "@/components/LogoutAndRedirect";
import { getJobApplications } from "@/libs/api/application";
import { AppliedJob } from "@/libs/definitions";
import Link from "next/link";

//mocking. Todo: after implementations API need remove this const
const jobs: AppliedJob[] = [
  {
    job_id: 1,
    title: "Backend Developer",
    is_remote: false,
    workplace_type: "On-site",
    posted_date: "2024-12-03T10:00:00",
    job_state: "Active",
    description:
      "Develop and optimize backend APIs, ensure robust database management.",
    apply_link: "https://backend.jobs/apply/789",
    company: "Backend Gurus",
    location: "Turin, Italy",
    portal: "Indeed",
  },
  {
    job_id: 2,
    title: "Backend Developer",
    is_remote: false,
    workplace_type: "On-site",
    posted_date: "2024-12-03T10:00:00",
    job_state: "Active",
    description: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque temporibus porro suscipit ipsam. Dolore maiores consequuntur laboriosam ad explicabo, quod harum culpa sit soluta. Eveniet laboriosam explicabo repudiandae fuga.
      A vitae libero alias ratione autem quam unde esse aliquam fugit, non cum voluptatibus velit impedit molestiae fuga? Hic, laboriosam? Natus distinctio ut, expedita culpa nemo ducimus nostrum a accusantium.
      Laborum dolorem reiciendis inventore nulla officia a veritatis, laudantium recusandae perspiciatis vitae culpa molestias nam facere blanditiis nesciunt minus accusamus quam nisi velit autem sint. Aspernatur distinctio explicabo nesciunt aperiam!
      Recusandae, architecto explicabo harum quaerat rem distinctio, esse inventore fugit autem vel nisi officia accusantium qui! Quidem expedita aliquam, blanditiis accusamus, neque, hic cum quibusdam consequuntur odit dolore corrupti cumque.
      Minima nam dignissimos facere ullam rem sit incidunt. Consequuntur expedita blanditiis quos minus corporis aspernatur, sequi qui, dolorum, eos nobis dignissimos iste veritatis doloremque officia magnam exercitationem possimus incidunt atque!
      Quibusdam illo, animi non quasi qui fuga corporis reprehenderit, assumenda possimus libero atque, ea beatae temporibus impedit ipsam molestiae vitae eaque. Porro error officiis dolores voluptatibus facere ipsa deleniti. Incidunt!
    `,
    apply_link: "https://backend.jobs/apply/789",
    company: "Backend Gurus",
    location: "Turin, Italy",
    portal: "Indeed",
  },
  {
    job_id: 3,
    title: "Backend Developer",
    is_remote: false,
    workplace_type: "On-site",
    posted_date: "2024-12-03T10:00:00",
    job_state: "Active",
    description:
      "Develop and optimize backend APIs, ensure robust database management.",
    apply_link: "https://backend.jobs/apply/789",
    company: "Backend Gurus",
    location: "Turin, Italy",
    portal: "Indeed",
  },
  {
    job_id: 4,
    title: "Backend Developer",
    is_remote: false,
    workplace_type: "On-site",
    posted_date: "2024-12-03T10:00:00",
    job_state: "Active",
    description:
      "Develop and optimize backend APIs, ensure robust database management.",
    apply_link: "https://backend.jobs/apply/789",
    company: "Backend Gurus",
    location: "Turin, Italy",
    portal: "Indeed",
  },
];

export default async function AutoJobs() {
  // todo: after implementations API uncomment this:
  // const result = await getJobApplications();

  // if (!result.success && result.statuCode === 401) {
  //   return <LogoutAndRedirect />;
  // }

  // const autoJobs: AppliedJob[] = result.data ?? [];
  const autoJobs: AppliedJob[] = Math.random() > 0.5 ? jobs : [];

  return autoJobs.length ? (
    <div className='font-light flex flex-col gap-5 bg-white- rounded-2xl'>
      <div className='flex flex-col gap-5'>
        <h5 className='text-2xl'>
          <b>Congratulations!</b> &nbsp;
          <span>
            We sent your application to <b>{autoJobs.length} jobs.</b>
          </span>
        </h5>
        <p>
          Refresh this page to get see pending applications turn into finalized.
        </p>
      </div>
      <Suspense fallback={<div>Loading jobs...</div>}>
        <JobFeedList jobs={autoJobs} />
      </Suspense>
    </div>
  ) : (
    <div className='font-light flex flex-col gap-5 bg-white- rounded-2xl'>
      <h5 className='text-2xl'>
        You can search for jobs now. Let’s get rolling. This will only take a
        few minutes.
      </h5>
      <div className='px-8 py-[50px] flex flex-col justify-center items-center rounded-2xl bg-zinc-300'>
        <div className='flex flex-col items-center gap-6'>
          <h2 className='text-lg font-light'>You don’t have any applied jobs yet.</h2>
          <Link
            className={
              "font-medium text-xl px-[60px] py-3 border border-input bg-white hover:bg-primary rounded-full"
            }
            href='/search'
          >
            Find a Job
          </Link>
        </div>
      </div>
    </div>
  );
}
