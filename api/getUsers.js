import fs from "fs";
import path from "path";

/**
 * API: /api/getUsers
 * Hanya admin yang memiliki ADMIN_KEY bisa mengakses data user
 */
export default async function handler(req, res) {
  try {
    // 🔒 Validasi kunci admin dari header Authorization
    const authHeader = req.headers["authorization"];
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey) {
      return res.status(500).json({
        success: false,
        message: "ADMIN_KEY belum diset di environment Vercel.",
      });
    }

    if (authHeader !== adminKey) {
      return res.status(403).json({
        success: false,
        message: "Akses ditolak! Token Authorization salah atau kosong.",
      });
    }

    // 📁 Ambil file users.json dari root project
    const filePath = path.join(process.cwd(), "users.json");

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File users.json tidak ditemukan di root project.",
      });
    }

    // 📖 Baca dan parse JSON
    const jsonData = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(jsonData);

    // ✅ Kirim data ke frontend
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    console.error("❌ Error getUsers:", err);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server: " + err.message,
    });
  }
}
