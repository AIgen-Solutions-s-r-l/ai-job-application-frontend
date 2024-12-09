import { useState, useEffect } from "react";
import { Bot, JobRole, JobProfile } from "@/libs/definitions";

interface AddBotModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (botData: Omit<Bot, "id" | "created_at" | "updated_at" | "total_applications" | "status">, botId?: string) => void; // Añadimos un parámetro opcional `botId`
  jobProfiles: JobProfile[];
  jobRoles: JobRole[];
  bot?: Bot | null; // El bot seleccionado para editar
}

export default function AddBotModal({ isOpen, setIsOpen, onSubmit, jobProfiles, jobRoles, bot }: AddBotModalProps) {
  const [botName, setBotName] = useState("");
  const [maxApplications, setMaxApplications] = useState(10); // Valor por defecto
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [aiCV, setAiCV] = useState(false);
  const [errors, setErrors] = useState({ botName: false, jobProfile: false, jobRole: false });

  // Efecto para precargar los datos cuando se edita un bot
  useEffect(() => {
    if (bot) {
      setBotName(bot.name);
      setMaxApplications(bot.max_applications);
      setSelectedProfile(bot.personal_information.id);
      setSelectedJobRole(bot.job_role.id);
      setAiCV(bot.ai_cv);
    } else {
      setBotName("");
      setMaxApplications(10);
      setSelectedProfile("");
      setSelectedJobRole("");
      setAiCV(false);
    }
  }, [bot]);

  const handleFormSubmit = () => {
    const newErrors = {
      botName: botName === "",
      jobProfile: selectedProfile === "",
      jobRole: selectedJobRole === "",
    };

    setErrors(newErrors);

    if (!newErrors.botName && !newErrors.jobProfile && !newErrors.jobRole) {
      onSubmit(
        {
          name: botName,
          max_applications: maxApplications,
          personal_information: jobProfiles.find(profile => profile.personalInfo.id === selectedProfile)?.personalInfo!,
          job_role: jobRoles.find(role => role.id === selectedJobRole)!,
          ai_cv: aiCV,
        },
        bot?.id // Si estamos editando, pasamos el ID del bot
      );
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-lg relative">
        {/* Botón de cierre */}
        <button className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost" onClick={() => setIsOpen(false)} aria-label="Close Modal">
          ✕
        </button>

        <h3 className="font-bold text-base">{bot ? "Edit Bot" : "Add New Bot"}</h3>

        {/* Campos del formulario */}
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Bot Name<span className="text-error ml-1">*</span></span>
          </label>
          <input
            type="text"
            placeholder="Enter bot name"
            className={`input input-bordered ${errors.botName ? "input-error" : ""}`}
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
          />
          {errors.botName && <span className="text-error text-sm">Bot name is required.</span>}
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Max Applications<span className="text-error ml-1">*</span></span>
          </label>
          <input
            type="number"
            min={1}
            className="input input-bordered"
            value={maxApplications}
            onChange={(e) => setMaxApplications(parseInt(e.target.value))}
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Job Profile<span className="text-error ml-1">*</span></span>
          </label>
          <select className={`select select-bordered ${errors.jobProfile ? "select-error" : ""}`} value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}>
            <option disabled value="">Select a job profile</option>
            {jobProfiles.map(profile => (
              <option key={profile.personalInfo.id} value={profile.personalInfo.id}>
                {profile.personalInfo.name}
              </option>
            ))}
          </select>
          {errors.jobProfile && <span className="text-error text-sm">Job profile is required.</span>}
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Job Role<span className="text-error ml-1">*</span></span>
          </label>
          <select className={`select select-bordered ${errors.jobRole ? "select-error" : ""}`} value={selectedJobRole} onChange={(e) => setSelectedJobRole(e.target.value)}>
            <option disabled value="">Select a job role</option>
            {jobRoles.map(role => (
              <option key={role.id} value={role.id}>
                {role.job_title}
              </option>
            ))}
          </select>
          {errors.jobRole && <span className="text-error text-sm">Job role is required.</span>}
        </div>

        {/* Toggle para AI CV Generation */}
        <div className="form-control mt-4">
          <label className="cursor-pointer label">
            <span className="label-text">AI CV Generation (Coming Soon)</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={aiCV}
              disabled
              onChange={() => setAiCV(!aiCV)}
            />
          </label>
        </div>

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleFormSubmit}>
            {bot ? "Update Bot" : "Add Bot"}
          </button>
          <button className="btn" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}