import http from 'http';
import { getAllSurahs, getSurahById, searchAyat } from './helpers/quranHelper.js';

const PORT = process.env.PORT || 5000;

function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode);
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  setCORSHeaders(res);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return sendJSON(res, 405, { error: 'Method not allowed' });
  }

  // GET /api/surahs
  if (pathname === '/api/surahs') {
    const surahs = getAllSurahs();
    return sendJSON(res, 200, surahs);
  }

  // GET /api/surahs/:id
  const surahMatch = pathname.match(/^\/api\/surah\/(\d+)$/);
  if (surahMatch) {
    const surah = getSurahById(surahMatch[1]);
    if (!surah) {
      return sendJSON(res, 404, { error: 'Surah not found' });
    }
    return sendJSON(res, 200, surah);
  }

  // GET /api/search?q=...
  if (pathname === '/api/search') {
    const q = url.searchParams.get('q');
    if (!q || q.trim() === '') {
      return sendJSON(res, 400, { error: '"q" param is required' });
    }
    const results = searchAyat(q.trim());
    return sendJSON(res, 200, results);
  }

  // 404 fallback
  return sendJSON(res, 404, { error: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});