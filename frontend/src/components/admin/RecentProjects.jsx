import { useNavigate } from "react-router-dom";

export default function RecentProjects({ projects }) {
  const navigate = useNavigate();
  const latest = projects && projects.length > 0 ? projects[0] : null;

  return (
    <div className="adminCard">
      <h3>Latest Project</h3>
      <div className="adminListContainer">
        {latest ? (
          <div className="featuredProject">
            {latest.media && latest.media.length > 0 && (
              <img src={latest.media[0].file} alt="project" className="recentProjectImg" />
            )}
            <div className="projectDetail">
              <span className="projectTitle">{latest.title}</span>
              <p className="projectDesc">
                {latest.description ? latest.description.substring(0, 100) + "..." : "No description available"}
              </p>
            </div>
          </div>
        ) : (
          <div className="adminListItem">No projects found.</div>
        )}
      </div>
      <button className="viewMoreBtn" onClick={() => navigate("/admin/projects")}>
        View All Projects
      </button>
    </div>
  );
}