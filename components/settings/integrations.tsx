"use client";

import { useTransition } from "react";
import { saveIntegration } from "@/libs/actions";
import Image from "next/image"; // Importamos el componente Image

const Integrations = ({ integrationData }: { integrationData: any }) => {
  const [isPending, startTransition] = useTransition();

  const handleSave = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      saveIntegration(
        integrationData?.profile_id, // Asegúrate de pasar el userId
        'LinkedIn', // Asumiendo que es para la plataforma LinkedIn
        formData.get('integration_email') as string,
        formData.get('integration_password') as string
      );
    });
  };

  return (
    <div className="col-span-1 rounded-lg shadow bg-white p-6">
      <div className="border-b pb-4 mb-4 border-neutral flex justify-between items-center">
        <h3 className="text-lg font-semibold">Integrations</h3>
      </div>
      <form onSubmit={handleSave}>
        <div className="space-y-6">
          <div className="card bg-white p-4 rounded-lg">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/linkedin-logo.webp"
                alt="LinkedIn Logo"
                width={64} // Ancho en píxeles
                height={64} // Altura en píxeles
                className="w-16 h-16" // Puedes ajustar el tamaño también si lo deseas
              />
              <div>
                <p className="text-sm font-semibold">LinkedIn</p>
                <p className="text-xs mt-1">
                  Connect your LinkedIn account to enable job applications.
                </p>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">LinkedIn Email</span>
              </label>
              <input
                type="email"
                name="integration_email"
                placeholder="Enter your LinkedIn email"
                className="input input-bordered w-full bg-white"
                defaultValue={integrationData?.email || ''}
              />
            </div>
            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text">LinkedIn Password</span>
              </label>
              <input
                type="password"
                name="integration_password"
                placeholder="Enter your LinkedIn password"
                className="input input-bordered w-full bg-white"
                defaultValue={integrationData?.password || ''}
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button className="btn btn-outline">Cancel</button>
              <button type="submit" className="btn btn-primary text-white">
                {isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Integrations;