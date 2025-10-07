export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { username, password } = req.body || {};

  try {
    // Contoh login sederhana (ganti nanti dengan validasi nyata)
    if (username === "admin" && password === "12345") {
      return res.status(200).json({ success: true, message: "Login berhasil" });
    } else {
      return res.status(401).json({ success: false, message: "Username atau password salah" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
}
