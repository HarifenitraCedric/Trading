
import { generateResponse } from "@/app/lib/ai";

export async function POST(req:Request){
    const body = await req.json();

    const resGenerated = await generateResponse(body.text);

    return Response.json(resGenerated.candidates); // This is in a form of array, test to see the output
}
