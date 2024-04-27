import { connectToDatabase } from "@utils/database";
import Puzzle from "@models/puzzle";


export const POST = async (req, res) => { 
    const {userId, puzzleInfo, spriteImages, startWorldInfo, goalWorldInfo} = await req.json();

    try{
        await connectToDatabase();

        const newPuzzle = new Puzzle({
            creator: userId,
            puzzleInfo: puzzleInfo,
            spriteImages: spriteImages,
            startWorldInfo: startWorldInfo,
            goalWorldInfo: goalWorldInfo
        });

        await newPuzzle.save();

        return new Response(JSON.stringify(newPuzzle), {status: 201});
    }catch(e){
        console.log(e);
        return new Response("Failed to create a new Puzzle", {status: 500});
    }

}

// userId
// puzzleInfo
// spriteImages
// startWorldInfo
//                     goalWorldInfo: goalWorldInfo