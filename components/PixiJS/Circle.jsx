import {Graphics} from '@pixi/react';
import {forwardRef, useCallback} from 'react';


const Circle = forwardRef(function Circle(props, ref) {
    const {x, y, radius, color} = props;

    const draw = useCallback(
        (g) => {
            g.clear();
            g.beginFill(color);
            g.drawCircle(x, y, radius);
            g.endFill();
        },
        [x, y, radius],
    );

    return <Graphics eventMode="static" onclick={() => console.log("clicked")} zIndex={5} draw={draw} ref={ref} />  
});

export default Circle;