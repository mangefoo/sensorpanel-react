import PercentageBar from "./PercentageBar";
import './DiskPanel.scss';

function bytesToGigabytes(bytes) {
    return (bytes / 1024 / 1024 / 1024).toFixed(0);
}

function extractDrive(key) {
    return key.substring("hdd_drive_name_".length);
}

function getDiskUsageBars(props) {
    if (!props.sensors) {
        return [];
    }

    const color = props.color ? props.color : "#9900dd";

    const drives = Object.keys(props.sensors)
        .filter(key => key.startsWith("hdd_drive_name_"))
        .map(key => { 
            const id = parseInt(extractDrive(key));
            const totalBytes = parseInt(props.sensors["hdd_drive_total_bytes_" + id]);
            const freeBytes = parseInt(props.sensors["hdd_drive_free_bytes_" + id]);
            const percentage = ((totalBytes - freeBytes) * 100 / totalBytes).toFixed(0);
            const name = props.sensors["hdd_drive_name_" + id];

            console.log("ID: " + id + ", total " + totalBytes);
            return { id: id, percentage: percentage, totalBytes: totalBytes, freeBytes: freeBytes, label: name }
        })
        .sort((first, second) => first.id < second.id ? -1 : 1);

    return ["disk-usage-left", "disk-usage-right"].map((column, i) => {
        return (
            <div className={column}>
                {
                    drives.slice(i * ((drives.length + 1) / 2), (i + 1) * (drives.length + 1) / 2)
                        .map(drive => (<div key={column + "-" + drive.id} className="disk-usage-row"><div style={{width: "20px", textAlign: "left"}}>{drive.label}</div><PercentageBar size="1" percentage={drive.percentage} display={bytesToGigabytes(drive.freeBytes) + " GB / " + bytesToGigabytes(drive.totalBytes) + " GB"} color={color} /></div>))
                }
            </div>);
    });
}

function DiskPanel(props) {
    return (
        <div className="disk-panel">
            <div className="disk-top-bar">
                <div className="disk-title">Disk</div>
            </div>
            <div className="disk-usage">
                {getDiskUsageBars(props)}
            </div>
        </div>
    );
}

export default DiskPanel;