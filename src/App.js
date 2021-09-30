import axios from 'axios';
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import CpuPanel from "./components/CpuPanel";
import GpuPanel from "./components/GpuPanel";
import NetworkPanel from './components/NetworkPanel';
import CpuCorePanel from './components/CpuCorePanel';
import MemoryPanel from './components/MemoryPanel';
import DiskPanel from './components/DiskPanel';

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
        const client = new W3CWebSocket('ws://sensor-relay.int.mindphaser.se/ws/' + response.data.id);

        //        const client = new W3CWebSocket('ws://127.0.0.1:3000/ws/' + response.data.id);
        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
          const data = JSON.parse(message.data);
          this.setState((prevState) => ({
            data: prevState.data.length > 0 ? [data, ...prevState.data.slice(0, 600)] : [data]
          }));
        };

      })
  }

  networkPanel() {
    const data = this.getLatestData("windows-sensor-agent");

    var received = ((data ? parseInt(data.sensors.network_received_bytes_1) : 0) * 8 / 1000000).toFixed(2);
    var sent = ((data ? parseInt(data.sensors.network_sent_bytes_1) : 0) * 8 / 1000000).toFixed(2);

    var receivedHistory = [];
    var sentHistory = [];

    if (data) {
      receivedHistory = this.filterStateData("windows-sensor-agent")
        .map((v) => v.sensors.network_received_bytes_1 * 8 / 1000000)
        .map(v => v > 100 ? 100 : v);

      sentHistory = this.filterStateData("windows-sensor-agent")
        .map((v) => v.sensors.network_sent_bytes_1 * 8 / 1000000)
        .map(v => v > 100 ? 100 : v);
    }

    return (
      <NetworkPanel received={received} receivedHistory={receivedHistory} sent={sent} sentHistory={sentHistory} />
    );
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

    return (
      <CpuPanel power={power} dieTemp={dieTemp} packageTemp={packageTemp} frequency={frequency} utilization={utilization} usageHistory={usageHistory} />
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
    const utilization = data ? parseFloat(data.sensors.gpu_utilization).toFixed(0) : "N/A";

    const usageHistory = this.filterStateData("windows-sensor-agent").map((v) => v.sensors.gpu_utilization);

    return (
      <GpuPanel power={power} voltage={voltage} dieTemp={dieTemp} packageTemp={packageTemp} frequency={frequency} fps={fps} utilization={utilization} usageHistory={usageHistory} />
    );
  }

  cpuCorePanel() {
    const data = this.getLatestData("windows-sensor-agent");

    return (
      <CpuCorePanel sensors={data ? data.sensors: {}}/>
    );
  }

  memoryPanel() {
    const data = this.getLatestData("windows-sensor-agent");
    const used = data ? parseFloat(data.sensors.mem_used).toFixed(2) : 0;
    const available = data ? parseFloat(data.sensors.mem_available).toFixed(2) : 0;

    return (
      <MemoryPanel used={used} available={available}/>
    )
  }

  diskPanel() {
    const data = this.getLatestData("windows-sensor-agent");

    return (
      <DiskPanel sensors={data ? data.sensors : {}}/>
    );
  }

  render() {
    return (
      <div className="sensor-panel">
        <div className="left-column">
          {this.cpuPanel()}
          {this.gpuPanel()}
          {this.networkPanel()}
        </div>
        <div className="right-column">
          {this.cpuCorePanel()}
          {this.memoryPanel()}
          {this.diskPanel()}
        </div>
      </div>
    );
  }
}

export default App;
