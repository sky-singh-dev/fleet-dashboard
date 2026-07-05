import { useEffect, useState, useRef, useCallback } from "react";

type Props<T> = {
  url: string;
  onMessage: (data: T) => void;
};

export default function useWebSocket<T>({ url, onMessage }: Props<T>) {
  const [status, setStatus] = useState("Connecting");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 1. Initialize WebSocket connection
    ws.current = new WebSocket(url);

    // 2. Handle connection open
    ws.current.onopen = () => setStatus("Connected");

    // 3. Handle incoming messages
    ws.current.onmessage = (event) => {
      try {
        const parsedData: T = JSON.parse(event.data);
        onMessage(parsedData);
      } catch (err) {
        console.log("Error parsing data on message", err);
      }
    };

    // 4. Handle connection error
    ws.current.onerror = (error) => console.error("WebSocket Error:", error);

    // 5. Handle connection close
    ws.current.onclose = () => setStatus("Disconnected");

    // 6. Clean up connection when component unmounts
    return () => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [onMessage, url]);

  // Function to send data to the server
  const sendMessage = useCallback((message: unknown) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected.");
    }
  }, []);

  return { status, sendMessage };
}
