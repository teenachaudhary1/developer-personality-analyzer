import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🤖 AI ENGINE (improved scoring system)
  const getAIProfile = (user) => {
    const repos = user.public_repos || 0;
    const followers = user.followers || 0;
    const following = user.following || 0;

    const score =
      repos * 2 +
      followers * 3 +
      Math.floor(following / 2);

    let personality = "";
    let badge = "";

    if (score > 250) {
      personality = "AI Architect";
      badge = "🧠 Genius Level";
    } else if (score > 150) {
      personality = "Elite Developer";
      badge = "🔥 High Performer";
    } else if (score > 80) {
      personality = "Skilled Builder";
      badge = "⚡ Strong Coder";
    } else if (score > 30) {
      personality = "Growing Developer";
      badge = "🌱 Improving";
    } else {
      personality = "Beginner Explorer";
      badge = "🌟 Starter";
    }

    return { score, personality, badge };
  };

  const getGitHubData = async () => {
    if (!username) return alert("Enter GitHub username");

    setLoading(true);
    setData(null);

    const res = await fetch(
      `https://api.github.com/users/${username}`
    );

    const result = await res.json();
    setData(result);

    setLoading(false);
  };

  const ai = data ? getAIProfile(data) : null;

  return (
    <div style={styles.bg}>
      <h1 style={styles.title}>🚀 Developer AI Analyzer</h1>
      <p style={styles.subtitle}>
        Smart AI-powered GitHub personality detection
      </p>

      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button style={styles.button} onClick={getGitHubData}>
          Analyze
        </button>
      </div>

      {loading && <p style={styles.text}>Analyzing AI signals...</p>}

      {data && (
        <div style={styles.profileCard}>
          <img src={data.avatar_url} style={styles.avatar} />
          <h2>{data.name || data.login}</h2>

          <p>📦 Repos: {data.public_repos}</p>
          <p>👥 Followers: {data.followers}</p>
          <p>➡️ Following: {data.following}</p>

          <div style={styles.aiBox}>
            <h3>{ai.badge}</h3>
            <p>🧠 Personality: {ai.personality}</p>
            <p>📊 AI Score: {ai.score}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "white",
    textAlign: "center",
    padding: "40px",
    fontFamily: "Arial",
  },

  title: {
    fontSize: "32px",
    fontWeight: "bold",
  },

  subtitle: {
    opacity: 0.7,
    marginBottom: "20px",
  },

  card: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "12px",
    width: "260px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },

  button: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "none",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  profileCard: {
    background: "rgba(255,255,255,0.05)",
    padding: "25px",
    borderRadius: "16px",
    display: "inline-block",
    backdropFilter: "blur(10px)",
    marginTop: "20px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },

  avatar: {
    width: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },

  aiBox: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "10px",
    background: "rgba(34,197,94,0.1)",
  },

  text: {
    marginTop: "10px",
  },
};

export default App;