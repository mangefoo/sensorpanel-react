import axios from 'axios';
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CpuPanel from "./CpuPanel";
import GpuPanel from "./GpuPanel";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("In constructor()");
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    axios.post("http://localhost:3000/register", {
      topics: ["sensors", "actions"]
    })
      .then((response) => {
        console.log("Got response " + JSON.stringify(response));
        const client = new W3CWebSocket('ws://sensor-relay.int.mindphaser.se/ws/' + response.data.id);

        //        const client = new W3CWebSocket('ws://127.0.0.1:3000/ws/' + response.data.id);
        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
          const data = JSON.parse(message.data);
          this.setState((prevState) => ({
            data: prevState.data.length > 0 ? [data, ...prevState.data] : [data]
          }));
        };

      })
  }

  cpuPanel() {
    const data = this.getLatestData("windows-sensor-agent");

    const power = data ? parseFloat(data.sensors.cpu_power).toFixed(2) : "N/A";
    const dieTemp = data ? parseFloat(data.sensors.cpu_die_temp).toFixed(0) : "N/A";
    const packageTemp = data ? parseFloat(data.sensors.cpu_package_temp).toFixed(0) : "N/A";
    const utilization = data ? parseFloat(data.sensors.cpu_utilization).toFixed(0) : "N/A";

    var frequency = "N/A";
    if (data != null) {
      const frequencyKeys = Object.keys(data.sensors).filter(v => v.startsWith("cpu_core_frequency_"));
      const frequencies = frequencyKeys.map(key => parseFloat(data.sensors[key]));
      frequency = Math.max.apply(null, frequencies).toFixed(0);
    }

    const usageHistory = this.filterStateData("windows-sensor-agent").map((v) => v.sensors.cpu_utilization);
    console.log(JSON.stringify(usageHistory));

    return (
      <CpuPanel power={power} dieTemp={dieTemp} packageTemp={packageTemp} frequency={frequency} utilization={utilization} usageHistory={usageHistory}/>
    );
  }

  filterStateData(reporter) {
    return (this.state.data.length > 0 ? this.state.data : []).filter(data => data.reporter === reporter);
  }

  getLatestData(reporter) {
    const filtered = this.filterStateData(reporter);
    return filtered.length > 0 ? filtered[0] : undefined;
  }

  gpuPanel() {
    const data = this.getLatestData("windows-sensor-agent");

    const power = data ? parseFloat(data.sensors.gpu_power).toFixed(2) : "N/A";
    const voltage = data ? parseFloat(data.sensors.gpu_voltage).toFixed(2) : "N/A";
    const dieTemp = data ? parseFloat(data.sensors.gpu_die_temp).toFixed(0) : "N/A";
    const packageTemp = data ? parseFloat(data.sensors.gpu_package_temp).toFixed(0) : "N/A";
    const frequency = data ? parseFloat(data.sensors.gpu_frequency).toFixed(0) : "N/A";
    const fps = data ? parseFloat(data.sensors.gpu_fps).toFixed(0) : "N/A";

    return (
      <GpuPanel power={power} voltage={voltage} dieTemp={dieTemp} packageTemp={packageTemp} frequency={frequency} fps={fps} />
    );
  }

  render() {
    return (
      <div className="sensor-panel">
        <div className="left-column">
          {this.cpuPanel()}
          {this.gpuPanel()}
        </div>
      </div>
    );
  }
}

export default App;
