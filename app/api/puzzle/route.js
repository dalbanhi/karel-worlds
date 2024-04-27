import { connectToDatabase } from "@utils/database";
import Puzzle from "@models/puzzle";

export const GET = async (req, res) => {
    try{
        await connectToDatabase();
        const puzzles = await Puzzle.find({}).populate('creator');
        return new Response(JSON.stringify(puzzles), {status: 200});
    }
    catch(e){
        console.log(e);
        return new Response("Failed to fetch puzzles", {status: 500});
    }
};