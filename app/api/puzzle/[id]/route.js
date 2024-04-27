//GET (read the puzzle with the given id)
import { connectToDatabase } from "@utils/database";
import Puzzle from "@models/puzzle";

export const GET = async (req, {params}) => {
    try{
        await connectToDatabase();
        const puzzle = await Puzzle.findById(params.id).populate('creator');

        if(!puzzle){
            return new Response("Puzzle not found", {status: 404});
        }


        return new Response(JSON.stringify(puzzle), {status: 200});
    }
    catch(e){
        console.log(e);
        return new Response("Failed to fetch the puzzle", {status: 500});
    }
};

//PATCH (update the puzzle with the given id)

//DELETE (delete the puzzle with the given id)