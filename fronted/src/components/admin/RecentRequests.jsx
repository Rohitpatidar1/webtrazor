// components/admin/RecentRequests.js

export default function RecentRequests({ requests }) {
  return (
    <div className="adminCard">
      <h3>Recent Requests</h3>

      <div className="adminListContainer">
        {requests && requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className="adminListItem">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div>
                  {/* Aapke backend data ke hisaab se fields: business_name */}
                  <div style={{ fontWeight: "600", color: "inherit" }}>
                    {req.business_name || "Unknown Business"}
                  </div>
                  {/* website_type field */}
                  <small style={{ color: "#00bfa6", fontSize: "0.8rem" }}>
                    {req.website_type || "General Inquiry"}
                  </small>
                </div>
                
                {/* Date handling */}
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>
                    {req.created_at ? new Date(req.created_at).toLocaleDateString() : ""}
                  </span>
                  {/* Status badge */}
                  <span style={{ 
                    fontSize: "0.65rem", 
                    padding: "2px 6px", 
                    borderRadius: "4px", 
                    background: req.status === 'new' ? '#1cc88a20' : '#4e73df20',
                    color: req.status === 'new' ? '#1cc88a' : '#4e73df'
                  }}>
                    {req.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="adminListItem">No recent requests found.</div>
        )}
      </div>

      <button 
        className="viewMoreBtn" 
        onClick={() => window.location.href = "/admin/build-requests"}
        style={{ marginTop: "15px" }}
      >
        View All Requests
      </button>
    </div>
  );
}