interface TitleAndDescriptionProps {
  title: string
  description: string
}

function TitleAndDescription({ title, description }: TitleAndDescriptionProps) {
  return (
    <div className="bg-card flex flex-col gap-4 rounded-xl border p-2 px-4 pb-4 md:h-full lg:border-none lg:bg-transparent lg:p-0">
      <div className="text-base/6 font-semibold lg:text-xl lg:font-bold">{title}</div>

      <div className="flex flex-col gap-2">
        {description.split('\n').map((paragraph, index) => (
          <p key={index} className="m-0 text-sm/5.5 lg:text-base/5.5">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

export { TitleAndDescription }
