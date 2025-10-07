import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username dan password wajib diisi" });

  // Ambil data user dari GitHub (atau database JSON di repo)
  const response = await fetch(
    `https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/users.json`
  );
  const users = await response.json();

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(403).json({ error: "Password salah" });

  return res.json({ message: "Login berhasil ✅" });
}