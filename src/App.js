/*global chrome*/
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import "./App.css";
import { useState } from "react";

function App() {
  const [state, setState] = useState([]);
  const [maxData, setmaxData] = useState([]);
  const [total, setTotal] = useState();
  const [other, setOther] = useState();
  const colorVariant = ["success", "warning", "danger", "info", "secondary"];
  const otherpercent = (other / total) * 100;

  const timeCast = (timeSec) => {
    const days = Math.floor(timeSec / 86400);
    const hours = Math.floor(timeSec / 3600) % 24;
    const minutes = Math.floor(timeSec / 60) % 60;
    let output = "";
    output += days ? `${days}d ` : "";
    output += hours ? `${hours}h ` : "";
    // Show minutes only of days is 0
    output += minutes && !days ? `${minutes}min ` : "";
    // Show timeSec only if hours and days is 0
    output += !days && !hours ? `${timeSec % 60}s` : "";

    return output.trim();
  };

  chrome.storage.local.get(null, (data) => {
    let total = 0;
    let other = 0;
    let website = Object.keys(data).map((webLink) => {
      total += parseInt(data[webLink] / 1000);
      const obj = {
        website: webLink,
        timeInSeconds: parseInt(data[webLink] / 1000),
      };

      return obj;
    });
    if (website != null) setState(website);
    const sortedData = [...state].sort(
      (a, b) => b.timeInSeconds - a.timeInSeconds
    );
    const arr = sortedData.slice(0, 4);
    setmaxData(arr);
    const maxSum = maxData.reduce(function (acc, curr) {
      return acc + curr.timeInSeconds;
    }, 0);
    other = total - maxSum;
    setTotal(total);
    setOther(other);
    console.log(total);
  });

  return (
    <div className="App">
      <header className="App-header">
        <Tabs
          defaultActiveKey="today"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="today" title="Today">
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <span>{timeCast(total)}</span>
                  <ProgressBar>
                    {maxData.map((element, index) => {
                      let percent = (element.timeInSeconds / total) * 100;
                      return (
                        <ProgressBar
                          animated
                          variant={colorVariant[index]}
                          now={percent}
                          key={index}
                        />
                      );
                    })}

                    <ProgressBar
                      animated
                      variant="secondary"
                      now={otherpercent}
                      key={4}
                    />
                  </ProgressBar>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup variant="flush">
                {maxData.map((element, index) => {
                  return (
                    <ListGroup.Item>
                      <Badge bg={colorVariant[index]}>
                        {element.website} : {timeCast(element.timeInSeconds)}
                      </Badge>
                    </ListGroup.Item>
                  );
                })}

                <ListGroup.Item>
                  <Badge bg="secondary">
                    {other > 0 ? `other : ${timeCast(other)} ` : ""}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Tab>
          <Tab eventKey="week" title="Weekly">
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <span>{timeCast(total)}</span>
                  <ProgressBar>
                    {maxData.map((element, index) => {
                      let percent = (element.timeInSeconds / total) * 100;
                      return (
                        <ProgressBar
                          animated
                          variant={colorVariant[index]}
                          now={percent}
                          key={index}
                        />
                      );
                    })}

                    <ProgressBar
                      animated
                      variant="secondary"
                      now={otherpercent}
                      key={4}
                    />
                  </ProgressBar>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup variant="flush">
                {maxData.map((element, index) => {
                  return (
                    <ListGroup.Item>
                      <Badge bg={colorVariant[index]}>
                        {element.website} : {timeCast(element.timeInSeconds)}
                      </Badge>
                    </ListGroup.Item>
                  );
                })}

                <ListGroup.Item>
                  <Badge bg="secondary">
                    {other > 0 ? `other : ${timeCast(other)} ` : ""}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Tab>
          <Tab eventKey="Month" title="Monthly">
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <span>{timeCast(total)}</span>
                  <ProgressBar>
                    {maxData.map((element, index) => {
                      let percent = (element.timeInSeconds / total) * 100;
                      return (
                        <ProgressBar
                          animated
                          variant={colorVariant[index]}
                          now={percent}
                          key={index}
                        />
                      );
                    })}

                    <ProgressBar
                      animated
                      variant="secondary"
                      now={otherpercent}
                      key={4}
                    />
                  </ProgressBar>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup variant="flush">
                {maxData.map((element, index) => {
                  return (
                    <ListGroup.Item>
                      <Badge bg={colorVariant[index]}>
                        {element.website} : {timeCast(element.timeInSeconds)}
                      </Badge>
                    </ListGroup.Item>
                  );
                })}

                <ListGroup.Item>
                  <Badge bg="secondary">
                    {other > 0 ? `other : ${timeCast(other)} ` : ""}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Tab>
        </Tabs>
      </header>
    </div>
  );
}

export default App;
