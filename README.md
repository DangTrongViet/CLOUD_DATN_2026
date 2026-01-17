# ☁️ AI Chatbot for Cloud Storage Service

AI Chatbot hỗ trợ người dùng quản lý dịch vụ **Cloud Storage** thông qua hội thoại tự nhiên.  
Chatbot có khả năng **hiểu ý định người dùng**, **gọi API backend an toàn**, và **trả lời thông minh** dựa trên dữ liệu hệ thống.

---

## 🎯 Mục tiêu dự án

- Cung cấp trải nghiệm quản lý cloud bằng hội thoại
- Giảm thao tác UI phức tạp
- Hỗ trợ người dùng 24/7
- Đảm bảo **bảo mật & phân quyền**

---

## ✨ Tính năng chính

- 📂 Liệt kê file (theo dung lượng, thời gian, loại file)
- 🗑️ Xóa file theo điều kiện (có xác nhận)
- 📊 Kiểm tra dung lượng lưu trữ
- 🔗 Chia sẻ file
- 📄 Tóm tắt nội dung file (PDF/DOCX)
- 💬 Chat hỏi đáp hướng dẫn sử dụng
- 🔐 Phân quyền & xác thực người dùng

---

## 🧠 Kiến trúc tổng thể

Frontend (React / Web)
|
| HTTP / WebSocket
v
Chatbot API (Django / FastAPI)
|
|-------------------------
| | |
AI Model Context DB Cloud API
(OpenAI / LLM) (Redis) (Storage Service)

---

## 🔄 Luồng xử lý Chatbot

1. Người dùng gửi tin nhắn
2. Backend xác thực (JWT / Session)
3. AI phân tích **intent**
4. Nếu cần hành động → trả về JSON action
5. Backend thực thi API Cloud
6. AI diễn giải kết quả cho người dùng

---

## 🧩 Supported Actions

| Action | Mô tả |
|------|------|
| LIST_FILES | Liệt kê file |
| DELETE_FILES | Xóa file theo điều kiện |
| STORAGE_INFO | Xem dung lượng |
| SHARE_FILE | Chia sẻ file |
| FILE_SUMMARY | Tóm tắt file |
| UPLOAD_GUIDE | Hướng dẫn upload |
| HELP | Trợ giúp |

---

## 📦 Định dạng JSON Action (AI → Backend)

```json
{
  "action": "DELETE_FILES",
  "params": {
    "size_gt": 104857600
  }
}
```

Quy ước

snake_case cho params

Dung lượng: bytes

Ngày: ISO-8601

🔐 Bảo mật (RẤT QUAN TRỌNG)

❌ AI KHÔNG:

Truy cập DB

Truy cập Storage

Viết SQL

Gọi API trực tiếp

✅ Backend LUÔN:

Xác thực JWT

Kiểm tra quyền bucket

Validate params

Log mọi action từ AI

🧠 Prompt System

Prompt được thiết kế theo mô hình:

User Message
    ↓
Intent Detection
    ↓
JSON Action
    ↓
Backend Execute
    ↓
AI Explain Result

👉 Xem chi tiết trong:
/prompts/system_prompt.txt

🛠️ Công nghệ đề xuất
Backend

Django REST Framework / FastAPI

PostgreSQL

Redis

Celery (optional)

Storage

MinIO / Local Storage / S3-compatible

AI

OpenAI / Azure OpenAI / Local LLM

Embedding cho file (RAG)

Frontend

React / Next.js

Chat UI (WebSocket)

🚀 Lộ trình phát triển
Phase 1

Chat FAQ

Không thao tác hệ thống

Phase 2

Intent detection

Chat → API

Phase 3

Chat với nội dung file (RAG)

Phase 4

Automation & gợi ý thông minh
