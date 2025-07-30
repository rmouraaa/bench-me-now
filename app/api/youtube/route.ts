import { NextResponse } from "next/server";
import { fetchVideosByTopic } from "@/lib/youtube";

export async function POST(req: Request) {
    const { topic } = await req.json();
    const videos = await fetchVideosByTopic(topic);
    return NextResponse.json({ videos });
}
