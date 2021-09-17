import PercentageBar from "./PercentageBar";
import Graph from "./Graph";

function CpuPanel(props) {
    return (
        <div className="cpu-panel">
            <div className="cpu-top-bar">
                <div className="cpu-title">CPU</div>
                <div className="cpu-power">{props.power} W</div>
                <div className="cpu-die-temp">{props.dieTemp + "\u2103"}</div>
                <div className="cpu-package-temp">{props.packageTemp + "\u2103"}</div>
                <div className="cpu-frequency">{props.frequency} MHz</div>
            </div>
            <div className="cpu-usage-panel">
                <div className="cpu-usage-bar">
                    <div className="cpu-usage-label">Usage</div>
                    <PercentageBar size="6" percentage={props.utilization}/>
                </div>
                <div className="cpu-usage-graph">
                    <Graph/>
                </div>
            </div>
        </div>
    );
}

export default CpuPanel;