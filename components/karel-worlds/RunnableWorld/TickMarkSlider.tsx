import { Slider } from "@/components/ui/slider";

const TickMarkSlider = ({
  karelSpeed,
  setKarelSpeed,
}: {
  karelSpeed: number;
  setKarelSpeed: (value: number) => void;
}) => {
  return (
    <div className="relative">
      {/* Slider */}
      {/* <span>Slow</span> */}
      <Slider
        value={[karelSpeed]}
        onValueChange={(value) => setKarelSpeed(value[0])}
        min={50}
        max={500}
        step={50}
        className="relative z-10"
      />
      {/* Tickmarks */}
      <datalist id="tickmarks" className="absolute top-4 w-full border">
        <option value="50" label="Slow" />
        <option value="100" />
        <option value="150" />
        <option value="200" />
        <option value="250" />
        <option value="300" />
        <option value="350" />
        <option value="400" />
        <option value="450" />
        <option value="500" label="Fast" />
      </datalist>
      {/* <span>Fast</span> */}
    </div>
  );
};

export default TickMarkSlider;
