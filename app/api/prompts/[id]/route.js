//Get
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";
export const GET = async (request,{ params })=>{
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate(
            'creator'
        );
        if(!prompt) return new Response("Prompt not found!", {status:404})
        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response(("Failed to fetch all Prompts"),{status:500});
        
    };

}

//Patch
export const PATCH =async (request,{params})=>{
    const{prompt,tag}=await request.json();
    try {
        await connectToDB();
        const existingPrompt= await Prompt.findById(params.id);
        if(!existingPrompt)return new Response("No prompt found!",{status:404})
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt),{status:200})

    } catch (error) {
        console.log(error)
        return new Response("Failed to update the prompt!",{status:500})
        
    }
}

//Delete
export const DELETE = async (request,{params})=>{
  try {
    await connectToDB()
    await Prompt.findByIdAndDelete(params.id)
    return new Response('Prompt deleted successfully',{status:200 })
  } catch (error) {
    return new Response('Error deleting prompt! Please try again later',{status:500 })
  }  
}