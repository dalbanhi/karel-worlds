import {Schema, model, models} from 'mongoose';

const PuzzleSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required.']
    },
    puzzleInfo:{
        type: Object,
        required: [true, 'Puzzle Info is required.']
    },
    spriteImages:{
        type: Object,
        required: [true, 'Sprite Images are required.']
    },
    startWorldInfo:{
        type: Object,
        required: [true, 'Start World Info is required.']
    },
    goalWorldInfo:{
        type: Object,
        required: [true, 'Goal World Info is required.']
    },
});

const Puzzle = models.Puzzle || model('Puzzle', PuzzleSchema);
export default Puzzle;