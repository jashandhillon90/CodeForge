import { Link } from 'react-router-dom';

export default function NotFoundState({ message = 'The address may be outdated, or the page may have moved.', backTo = '/', backLabel = 'Return to CodeForge' }) {
  return (
    <main className="route-error">
      <p className="route-error-code">404</p>
      <h1>Page not found</h1>
      <p>{message}</p>
      <Link to={backTo} className="btn-primary">{backLabel}</Link>
    </main>
  );
}
