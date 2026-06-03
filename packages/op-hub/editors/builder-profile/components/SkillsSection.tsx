import { Sparkles, X, Check } from "lucide-react";
import type { BuilderSkill } from "document-models/builder-profile";

const SKILL_OPTIONS: {
  value: BuilderSkill;
  label: string;
  color: string;
}[] = [
  {
    value: "FRONTEND_DEVELOPMENT",
    label: "Frontend Development",
    color: "bg-blue-500",
  },
  {
    value: "BACKEND_DEVELOPMENT",
    label: "Backend Development",
    color: "bg-slate-600",
  },
  {
    value: "FULL_STACK_DEVELOPMENT",
    label: "Full Stack Development",
    color: "bg-violet-500",
  },
  {
    value: "DEVOPS_ENGINEERING",
    label: "DevOps Engineering",
    color: "bg-orange-500",
  },
  {
    value: "SMART_CONTRACT_DEVELOPMENT",
    label: "Smart Contract Development",
    color: "bg-emerald-500",
  },
  {
    value: "UI_UX_DESIGN",
    label: "UI/UX Design",
    color: "bg-pink-500",
  },
  {
    value: "TECHNICAL_WRITING",
    label: "Technical Writing",
    color: "bg-amber-500",
  },
  {
    value: "QA_TESTING",
    label: "QA Testing",
    color: "bg-green-500",
  },
  {
    value: "DATA_ENGINEERING",
    label: "Data Engineering",
    color: "bg-indigo-500",
  },
  {
    value: "SECURITY_ENGINEERING",
    label: "Security Engineering",
    color: "bg-red-500",
  },
];

interface SkillsSectionProps {
  skills: BuilderSkill[];
  onAddSkill: (skill: BuilderSkill) => void;
  onRemoveSkill: (skill: BuilderSkill) => void;
}

export function SkillsSection({
  skills,
  onAddSkill,
  onRemoveSkill,
}: SkillsSectionProps) {
  const availableSkills = SKILL_OPTIONS.filter(
    (option) => !skills.includes(option.value),
  );
  const selectedSkills = skills
    .map((skill) => SKILL_OPTIONS.find((s) => s.value === skill))
    .filter(Boolean);

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Sparkles size={18} className="text-blue-600" />
        </span>
        Skills
      </h3>
      <p className="text-sm text-slate-500 mb-5">
        Select the skills that best represent your expertise
      </p>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {selectedSkills.map(
            (skill) =>
              skill && (
                <div
                  key={skill.value}
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 hover:border-slate-300 transition-all"
                >
                  <span className={`w-2 h-2 rounded-full ${skill.color}`} />
                  <span className="text-sm font-medium text-slate-700">
                    {skill.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveSkill(skill.value)}
                    className="ml-1 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 text-slate-400 hover:text-red-600 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ),
          )}
        </div>
      )}

      {/* Empty state */}
      {skills.length === 0 && (
        <div className="text-center py-8 mb-5 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200">
          <Sparkles size={32} className="text-slate-300 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">No skills selected yet</p>
          <p className="text-slate-400 text-xs mt-1">
            Add skills from the dropdown below
          </p>
        </div>
      )}

      {/* Add Skill Dropdown */}
      {availableSkills.length > 0 && (
        <div className="relative">
          <select
            className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-xl text-sm bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            onChange={(e) => {
              if (e.target.value) {
                onAddSkill(e.target.value as BuilderSkill);
                e.target.value = "";
              }
            }}
            defaultValue=""
          >
            <option value="" disabled>
              + Add a skill...
            </option>
            {availableSkills.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* All skills added message */}
      {availableSkills.length === 0 && skills.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 rounded-xl px-4 py-3">
          <Check size={16} />
          <span>All available skills have been added</span>
        </div>
      )}
    </div>
  );
}
