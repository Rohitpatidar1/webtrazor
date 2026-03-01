export default function ServiceRow({ data, onDelete }) {
  return (
    <div className="serviceRow">
      {/* Mapping updated to match your API keys */}
      <div>{data.client_name}</div>
      <div><strong>{data.service_type}</strong></div>
      <div>{data.location}</div>
      <div>{data.phone}</div>
      
      <div>
        <span className={`status ${data.status.toLowerCase()}`}>{data.status}</span>
      </div>

      <div>{new Date(data.created_at).toLocaleDateString()}</div>

      <div className="actions">
        <span title="View" style={{cursor: 'pointer'}}>👁</span>
        <span title="Approve" style={{cursor: 'pointer', color: 'green'}}>✔</span>
        <span 
          title="Delete" 
          onClick={() => onDelete(data.id)} 
          style={{cursor: 'pointer', color: 'red'}}
        >
          🗑
        </span>
      </div>
    </div>
  );
}