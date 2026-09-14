type DeductionMapProps = {
  initialCount: number
  history: number[]
}

export function DeductionMap({ initialCount, history }: DeductionMapProps) {
  const values = [initialCount, ...history]
  const max = Math.max(initialCount, 1)

  return (
    <section className="deduction" aria-labelledby="deduction-title">
      <div className="deduction__heading">
        <div>
          <p className="eyebrow" id="deduction-title">SEARCH SPACE</p>
          <p>Possible solutions consistent with every signal.</p>
        </div>
        <strong>{values.at(-1)?.toLocaleString()}</strong>
      </div>

      <ol className="deduction__steps" aria-label="Candidate reduction history">
        {values.map((value, index) => (
          <li key={`${index}-${value}`}>
            <span>{index === 0 ? 'START' : String(index).padStart(2, '0')}</span>
            <div className="deduction__track" aria-hidden="true">
              <i style={{ width: `${Math.max((value / max) * 100, 2)}%` }} />
            </div>
            <strong>{value}</strong>
          </li>
        ))}
      </ol>
    </section>
  )
}
