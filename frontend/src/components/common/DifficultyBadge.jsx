// DifficultyBadge.jsx
export default function DifficultyBadge({ difficulty }) {
  const cls = {
    Easy: 'badge-easy',
    Medium: 'badge-medium',
    Hard: 'badge-hard',
  }[difficulty] || 'badge-easy';

  return (
    <span className={`pill ${cls}`} style={{ fontSize: '0.75rem' }}>
      {difficulty}
    </span>
  );
}
