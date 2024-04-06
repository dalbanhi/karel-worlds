import {Graphics} from '@pixi/react';
import {forwardRef, useCallback} from 'react';


const Circle = forwardRef(function Circle(props, ref) {
    const {x, y, radius} = props;

    const draw = useCallback(
        (g) => {
            g.clear();
            g.beginFill(0xff0000);
            g.drawCircle(x, y, radius);
            g.endFill();
        },
        [x, y, radius],
    );

    return <Graphics draw={draw} ref={ref} />  
});

export default Circle;