import { SectionTitle } from '../section-title'

export default function DetailsSection() {
  return (
    <div className="mt-6">
      <SectionTitle title="Milestones Roadmap Details" />

      <div className="mt-6 flex flex-col gap-[40px]">
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-12 dark:border-gray-600 dark:bg-gray-800">
          <div className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
            Milestone details card
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Coming soon</div>
        </div>
      </div>
    </div>
  )
}
