# 🚀 Caching Proxy Server

A simple Node.js proxy server built with Express that forwards requests to an origin server and caches responses with TTL (Time-To-Live).

---

## 📌 Features

* ✅ Forward requests to any origin server
* ⚡ In-memory caching for faster responses
* ⏱️ TTL-based cache expiration
* 💾 Persistent cache storage (`cache.json`)
* 🧹 Automatic cleanup of expired cache
* 🎯 CLI-based configuration (port, origin, ttl)
* 🔒 Caches only GET requests (best practice)

---

## 🛠️ Tech Stack

* Node.js
* Express
* Axios
* Yargs
* File System (`fs`)

---

## 📂 Project Structure

```
caching-proxy/
│── src/
│   └── index.js
│── cache.json
│── package.json
```

---

## ⚙️ Installation

```bash
git clone <your-repo-url>
cd caching-proxy
npm install
```

---

## ▶️ Usage

Run the server with:

```bash
npm start -- --port 3000 --origin http://dummyjson.com --ttl 60
```

### 🔧 Arguments

| Argument   | Description                   |
| ---------- | ----------------------------- |
| `--port`   | Port to run the proxy server  |
| `--origin` | Base URL of the origin server |
| `--ttl`    | Cache time (in seconds)       |

---

## 🔁 How It Works

1. Client sends request to proxy
2. Proxy builds full target URL using origin
3. Cache is checked:

   * ✅ If valid → return cached response
   * ❌ If expired/missing → fetch from origin
4. Response is stored in cache with expiry
5. Cache is saved to `cache.json`
6. Response is sent back to client

---

## 🧠 Example Flow

### First Request

```
GET /products
```

* ❌ Cache MISS
* Fetch from origin server
* Store in cache

---

### Second Request (within TTL)

```
GET /products
```

* ✅ Cache HIT
* Instant response

---

### After TTL expires

```
GET /products
```

* ⏰ Cache expired
* Fetch again from origin

---

## 🧹 Cache Cleanup

* Runs automatically every **50 seconds**
* Removes expired cache entries
* Updates `cache.json`

---

## 📡 Example Endpoint

Test route:

```
GET /home/api
```

---

## ⚠️ Limitations

* Only caches GET requests
* No cache size limit (can grow large)
* Uses file-based storage (not scalable)

---

## 🚀 Future Improvements

* 🔄 Cache invalidation API (`/clear-cache`)
* 📦 LRU Cache (size-based eviction)
* ⚡ Redis integration (production-ready)
* 🧾 Cache headers support (ETag, Cache-Control)

---

## 👨‍💻 Author
Khushi Bhardwaj
---

## 📄 License

This project is open-source.
