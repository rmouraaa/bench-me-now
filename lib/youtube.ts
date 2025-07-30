export async function fetchVideosByTopic(query: string) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro ao buscar vídeos do YouTube");

    const data = await res.json();
    return data.items;
}
