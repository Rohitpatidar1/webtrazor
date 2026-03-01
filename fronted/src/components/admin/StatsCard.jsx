export default function StatsCard({ title, value }) {
  return (
    <div className="adminStatCard">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
