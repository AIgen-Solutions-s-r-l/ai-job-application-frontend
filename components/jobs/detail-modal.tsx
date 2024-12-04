import { PaperClipIcon } from '@heroicons/react/20/solid';
import { AutoJob } from '@/libs/definitions';

interface DetailModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  job: AutoJob | null;
}

export default function DetailModal({ isModalOpen, setIsModalOpen, job }: DetailModalProps) {
  if (!job) return null;

  // Obtener el nombre del archivo del resumen a partir de la ruta
  const resumeFileName = job.resume_path.split('/').pop();

  return (
    <>
      <input type="checkbox" id="detail-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(false)} />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-2xl h-[95vh] rounded-xl flex flex-col px-0">
          <div className="modal-header flex justify-between items-center pb-4 px-6">
            <h3 className="text-base font-semibold leading-7">Job Application Information</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost"
              aria-label="Close"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-6 pb-6">
            <dl className="divide-y divide-gray-100">
              {/* Company */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Company</dt>
                <dd className="mt-1 text-sm leading-6 text-base-content sm:col-span-2 sm:mt-0">{job.company}</dd>
              </div>
              {/* Job Title */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Job Title</dt>
                <dd className="mt-1 text-sm leading-6 text-base-content sm:col-span-2 sm:mt-0">{job.job_title}</dd>
              </div>
              {/* Job Location */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Location</dt>
                <dd className="mt-1 text-sm leading-6 text-base-content sm:col-span-2 sm:mt-0">{job.job_location}</dd>
              </div>
              {/* Application Link */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Job Link</dt>
                <dd className="mt-1 text-sm leading-6 text-base-content sm:col-span-2 sm:mt-0">
                  <a href={job.link} target="_blank" className="link link-primary">
                    View Job Posting
                  </a>
                </dd>
              </div>
              {/* Job Recruiter */}
              {job.job_recruiter && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6">Recruiter LinkedIn</dt>
                  <dd className="mt-1 text-sm leading-6 text-base-content sm:col-span-2 sm:mt-0">
                    <a href={job.job_recruiter} target="_blank" className="link link-primary">
                      View Recruiter Profile
                    </a>
                  </dd>
                </div>
              )}
              {/* Resume */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Resume</dt>
                <dd className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{resumeFileName}</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={job.resume_path}
                          target="_blank"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          View Resume
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
              {/* Apply Responses */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Additional Responses</dt>
                <dd className="mt-1 text-sm leading-6 text-base-content sm:col-span-2 sm:mt-0">
                  <ul className="list-disc pl-5">
                    {job.apply_responses.map((response, index) => (
                      <li key={index}>
                        <strong>{response.question}: </strong>{response.answer}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              {/* Status */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Status</dt>
                <dd className="mt-1 text-sm leading-6 text-base-content sm:col-span-2 sm:mt-0">
                  <span className={`inline-block rounded-badge px-3 py-1 text-xs font-medium ${job.status === 'Success' ? 'bg-success/5 text-success' : job.status === 'Skipped' ? 'bg-info/5 text-info' : 'bg-error/5 text-error'}`}>
                    {job.status}
                  </span>
                </dd>
              </div>
              {/* Date Applied */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Date Applied</dt>
                <dd className="mt-1 text-sm leading-6 text-base-content sm:col-span-2 sm:mt-0">
                  {new Date(job.created_at).toLocaleDateString()}
                </dd>
              </div>
              {/* Job Role */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">Job Role</dt>
                <dd className="mt-1 text-sm leading-6 text-base-content sm:col-span-2 sm:mt-0">
                  {job?.bots?.job_roles.job_title}
                </dd>
              </div>
            </dl>
          </div>

          <div className="modal-action px-6">
            <button className="btn" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}