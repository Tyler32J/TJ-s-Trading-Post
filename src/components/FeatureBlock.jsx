function FeatureBlock({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]">
        <Icon className="h-7 w-7 text-[#1a1a1a]" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-[#d4af37]">{title}</h3>
      <p className="max-w-xs text-sm text-neutral-300">{description}</p>
    </div>
  )
}

export default FeatureBlock
