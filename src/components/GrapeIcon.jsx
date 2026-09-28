function GrapeIcon({ className = 'w-6 h-6' }) {
  const dots = [
    [12, 4],
    [8, 8],
    [16, 8],
    [5, 13],
    [12, 13],
    [19, 13],
    [8, 18],
    [16, 18],
    [12, 22],
  ]

  return (
    <svg
      viewBox="0 0 24 26"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.1" />
      ))}
    </svg>
  )
}

export default GrapeIcon
