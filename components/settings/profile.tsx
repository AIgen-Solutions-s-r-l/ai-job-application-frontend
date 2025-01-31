"use client";

import { useTransition } from "react";
import { saveProfile } from "@/libs/actions";

const Profile = ({ profileData }: { profileData: any }) => {
  const [isPending, startTransition] = useTransition();

  const handleSave = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      saveProfile(
        profileData?.id, // Asumiendo que tienes el userId en el profileData
        formData.get('full_name') as string,
        formData.get('email') as string,
        formData.get('username') as string,
        formData.get('phone_number') as string
      );
    });
  };

  return (
    <div className="col-span-2 rounded-lg shadow bg-white p-6">
      <div className="border-b pb-4 mb-4 border-neutral">
        <h3 className="text-lg font-semibold">Profile Information</h3>
      </div>
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              className="input input-bordered w-full bg-white dark:bg-base-200"
              defaultValue={profileData?.full_name || ''}
            />
          </div>
          {/* Phone Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              name="phone_number"
              placeholder="+123 456 7890"
              className="input input-bordered w-full bg-white dark:bg-base-200"
              defaultValue={profileData?.phone_number || ''}
            />
          </div>
        </div>

        {/* Email and Username */}
        <div className="form-control mt-6">
          <label className="label">
            <span className="label-text">Email Address</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="yourname@example.com"
            className="input input-bordered w-full bg-white dark:bg-base-200"
            defaultValue={profileData?.email || ''}
          />
        </div>
        <div className="form-control mt-6">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Your username"
            className="input input-bordered w-full bg-white dark:bg-base-200"
            defaultValue={profileData?.username || ''}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button className="btn btn-outline">Cancel</button>
          <button type="submit" className="btn btn-primary text-white">
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;