import Graph from './Graph';
import PercentageBar from './PercentageBar';
import TemperatureGauge from './TemperatureGauge';
import './GpuPanel.scss';

function GpuPanel(props) {
    return (
        <div className="gpu-panel">
            <div className="gpu-top-bar">
                <div className="gpu-title">GPU</div>
                <div className="gpu-power-panel">
                    <div className="gpu-power">{props.power} W</div>
                    <div className="gpu-voltage">{props.voltage} V</div>
                </div>
                <div className="gpu-die-temp">
                    <TemperatureGauge temperature={props.dieTemp} />
                </div>
                <div className="gpu-package-temp">
                    <TemperatureGauge temperature={props.packageTemp} />
                </div>
                <div className="gpu-frequency-panel">
                    <div className="gpu-frequency">{props.frequency} MHz</div>
                    <div className="gpu-fps">{props.fps} FPS</div>
                </div>
            </div>
            <div className="gpu-usage-panel">
                <div className="gpu-usage-bar">
                    <div className="gpu-usage-label">Usage</div>
                    <PercentageBar size="6" percentage={props.utilization} color="#ff0000" />
                </div>
                <div className="gpu-usage-graph">
                    <Graph data={[{color: "#ff0000", points: props.usageHistory}]}/>
                </div>
            </div>
        </div>
    );
}

export default GpuPanel;