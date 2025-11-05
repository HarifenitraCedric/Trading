
import { generateResponse } from "@/app/lib/ai";
import { UIMessage } from "ai";

export async function POST(req:Request){
    const {messages}: { messages: UIMessage[] } = await req.json();

    const resGenerated = await generateResponse(messages);

    return resGenerated.toUIMessageStreamResponse(); // This is in a form of array, test to see the output
}
