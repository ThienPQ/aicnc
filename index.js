import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Hỗ trợ cấp phép (AI)</h1>
      <textarea
        rows="4"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập nội dung yêu cầu kiểm tra hồ sơ..."
      />
      <br />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Đang xử lý..." : "Gửi"}
      </button>
      <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
        <strong>Kết quả:</strong>
        <div>{response}</div>
      </div>
    </div>
  );
}
