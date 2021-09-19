import PercentageBar from "./PercentageBar";
import './CpuCorePanel.scss';

function extractCore(key) {
    return key.substring("cpu_core_load_".length);
}

function getCoreMeters(props) {
    if (!props.sensors) {
        return [];
    }

    const color = props.color ? props.color : "#00ff00";

    const cores = Object.keys(props.sensors)
        .filter(key => key.startsWith("cpu_core_load_"))
        .map(key => { return { core: parseInt(extractCore(key)), value: parseInt(parseFloat(props.sensors[key]).toFixed(0)) } })
        .sort((first, second) => first.core < second.core ? -1 : 1);

    console.log("Cores: " + JSON.stringify(cores));

    return ["cpu-core-cores-left", "cpu-core-cores-right"].map((column, i) => {
        return (
            <div className={column}>
                {
                    cores.slice(i * (cores.length / 2), (i + 1) * cores.length / 2)
                        .map(core => (<div className="cpu-core-row"><div style={{width: "34px", textAlign: "left"}}>#{core.core}</div><PercentageBar size="1" percentage={core.value} display={parseInt(props.sensors["cpu_core_frequency_" + core.core]) + " MHz"} color={color} /></div>))
                }
            </div>);
    });
}

export default function CpuCorePanel(props) {
    return (
        <div className="cpu-core-panel">
            <div className="cpu-core-title">CPU Cores</div>
            <div className="cpu-core-cores">
                {getCoreMeters(props)}
            </div>
        </div>
    );
}
