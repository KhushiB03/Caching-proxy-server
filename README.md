# 🚀 Caching Proxy Server

A CLI-based caching proxy server built using Node.js and Express.

This tool forwards incoming HTTP requests to an origin server and caches the responses to improve performance and reduce redundant network calls.

---

## 📌 Features

* Start server using CLI arguments
* Forward requests to an origin server (coming next)
* Cache responses for repeated requests (coming next)
* Return cached responses with headers (`X-Cache: HIT/MISS`)
* Clear cache via CLI command (coming next)

---

## 🧠 How It Works

1. Client sends request → Proxy server
2. Proxy checks if response exists in cache
3. If YES → returns cached response (**HIT**)
4. If NO → forwards request to origin → stores response → returns (**MISS**)

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-link>
cd caching-proxy
npm install
```

---

## ▶️ Usage

Run the server using CLI arguments:

```bash
node src/index.js --port 3000 --origin http://dummyjson.com
```

---

## 🧪 Example

Start server:

```bash
node src/index.js --port 3000 --origin http://dummyjson.com
```

Open in browser:

```
http://localhost:3000
```

Response:

```
PORT = 3000
Origin = http://dummyjson.com
```

---

## 📁 Project Structure

```
caching-proxy/
│── src/
│   └── index.js
│── package.json
│── README.md
```

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* yargs (CLI parsing)

---

## 🚧 Current Status

### ✅ Completed

* Basic Express server
* CLI argument parsing using yargs

### ⏳ In Progress

* Request forwarding (proxy logic)
* Response caching

### 🔜 Planned Features

* Cache with TTL (expiry)
* LRU cache optimization
* Cache clearing via CLI
* Logging & debugging support

---

## 🧪 Testing (Manual)

1. Start the server
2. Open browser or use Postman
3. Send request to:

   ```
   http://localhost:3000/<endpoint>
   ```

---

## 📚 Learning Goals

This project helps understand:

* How proxy servers work
* HTTP request/response lifecycle
* Caching strategies
* CLI tool development
* Backend system design fundamentals

---

## 🤝 Contribution

This is a learning project, but contributions and suggestions are welcome.

---

## 📄 License

ISC License

---

## ✨ Author

Khushi
