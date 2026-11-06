// Shows an item's condition as gold stars out of 5: new = 5, like-new = 4, good = 3, fair = 2.
const STARS_FOR = { new: 5, 'like-new': 4, good: 3, fair: 2 }
const TOTAL = 5

function ConditionStars({ condition }) {
  const filled = STARS_FOR[condition] ?? 0

  return (
    <span
      className="flex items-center gap-1.5 text-xs capitalize text-neutral-500 dark:text-neutral-400"
      // Screen readers hear "Condition: good, 2 of 4 stars" instead of four star symbols.
      aria-label={`Condition: ${condition}, ${filled} of ${TOTAL} stars`}
      title={`Condition: ${condition}`}
    >
      <span aria-hidden="true" className="text-[15px] leading-none tracking-[1px]">
        <span className="text-[#d4af37]">{'★'.repeat(filled)}</span>
        <span className="text-neutral-300 dark:text-neutral-600">{'★'.repeat(TOTAL - filled)}</span>
      </span>
      <span aria-hidden="true">{condition}</span>
    </span>
  )
}

export default ConditionStars
