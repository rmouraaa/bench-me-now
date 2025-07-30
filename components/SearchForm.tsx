"use client";

import { useState } from "react";

export default function SearchForm() {
    const [topic, setTopic] = useState("");
    const [results, setResults] = useState<any[]>([]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch("/api/youtube", {
            method: "POST",
            body: JSON.stringify({ topic }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setResults(data.videos);
    }

    return (
        <div className="p-4 max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Digite um tema..."
                    className="flex-1 border px-3 py-2 rounded"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Buscar</button>
            </form>

            {results.length > 0 && (
                <ul className="space-y-3">
                    {results.map((video) => (
                        <li key={video.id.videoId}>
                            <a
                                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                target="_blank"
                                className="block border p-3 rounded hover:bg-gray-50"
                            >
                                <strong>{video.snippet.title}</strong>
                                <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
