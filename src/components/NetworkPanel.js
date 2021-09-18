import PercentageBar from "./PercentageBar";
import Graph from "./Graph";
import './NetworkPanel.scss';

function NetworkPanel(props) {
    const graphData = [
        { color: "#cccc00", points: props.receivedHistory },
        { color: "#00ffff", points: props.sentHistory }
    ]
    return (
        <div className="network-panel">
            <div className="network-top-bar">
                <div className="network-title">Network</div>
                <div className="network-legend">
                    <div className="network-legend-row"><div className="network-receive-legend"></div>Receive</div>
                    <div className="network-legend-row"><div className="network-send-legend"></div>Send</div>
                </div>
            </div>
            <div className="network-usage-panel">
                <div className="network-usage-bar">
                    <div className="network-received-bar">
                        <PercentageBar size="1" percentage={props.received} max="100" suffix=" Mbit/s" color="#cccc00" />
                    </div>
                    <div className="network-sent-bar">
                        <PercentageBar size="1" percentage={props.sent} max="100" suffix=" Mbit/s" color="#00ffff" />
                    </div>
                </div>
                <div className="network-usage-graph">
                    <Graph data={graphData} />
                </div>
            </div>
        </div>
    );
}

export default NetworkPanel;