/**
 * Alertmanager response status codes
 */
enum ResponseStatus {
  Success = 'success',
  Error = 'error',
}

/**
 * Alertmanager basic response (to be extended)
 * 
 * {
 *   "status": "success",
 *   ...
 *  }
 */
interface IResponse {
  status: ResponseStatus;
}

/**
 * Alertmanager error response codes
 */
enum ErrorType {
  None = '',
  ErrorInternal = 'server_error',
  ErrorBadData = 'bad_data',
}

/**
 * Alertmanager error response
 * {
 *   "status": "error",
 *   "errorType": "bad_data",
 *   "error": "start time must not be equal to end time"
 * }
 */
interface IErrorResponse extends IResponse {
  errorType: ErrorType;
  error: string;
}

/**
 * Alertmanager version info
 * {
 *   "branch": "HEAD",
 *   "buildDate": "20180323-13:05:10",
 *   "buildUser": "root@f278953f13ef",
 *   "goVersion": "go1.10",
 *   "revision": "acb111e812530bec1ac6d908bc14725793e07cf3",
 *   "version": "0.15.0-rc.1"
 * }
 */
interface IVersionInfo {
  version: string;
  revision: string;
  branch: string;
  buildUser: string;
  buildDate: string;
  goVersion: string;
}

/**
 * Alertmanager peer info
 * {
 *   "name": "01C9HP6FPJTRWGS7ESQ9A0TD8M",
 *   "address": "172.17.0.2:9094"
 * }
 */
interface IPeer {
  name: string;
  address: string;
}

/**
 * Alertmanager cluster status
 * {
 *   "name": "01C9HP6FPJTRWGS7ESQ9A0TD8M",
 *   "status": "ready",
 *   "peers": [ ... ]
 * }
 */
interface IClusterStatus {
  name: string;
  status: string; // TODO: enum
  peers: IPeer[];
}

/**
 * Alertmanager instance status
 * {
 *   "status": "success",
 *   "data": {
 *     "configYAML": "...",
 *     "configJSON": { ... },
 *     "versionInfo": { ... },
 *     "uptime": "2018-03-26T17:37:51.328396532Z",
 *     "clusterStatus": { ... }
 * }
 */
interface IStatus {
  configYAML: string;
  configJSON: object;
  versionInfo: IVersionInfo;
  uptime: string;
  clusterStatus: IClusterStatus;
}

/**
 * Alertmanager instance status response
 * {
 *   "status": "success",
 *   "data": { ... }
 *  }
 */
interface IStatusResponse extends IResponse {
  data: IStatus;
}

/**
 * Alertmanager alert annotations
 * {
 *   "description": "Service wmi-exporter on web001 for web-servers is down.",
 *   "summary": "Monitor service non-operational"
 * }
 */
interface IAlertAnnotations {
  description: string;
  summary: string;
  [annotation: string]: string;
}


/**
 * Alertmanager alert status
 * {
 *   "state": "active",
 *   "silencedBy": [],
 *   "inhibitedBy": []
 * }
 */
interface IAlertStatus {
  state: string;
  silencedBy: any[];
  inhibitedBy: any[];
}

/**
 * {
 *   "labels": { ... },
 *   "annotations": { ... },
 *   "startsAt": "2018-03-12T16:18:01.452473712Z",
 *   "endsAt": "2018-03-12T16:25:46.457397041Z",
 *   "generatorURL": "http://6d5e18c50021:9090/graph?g0.expr=up+%3D%3D+0&g0.tab=1",
 *   "status": { ... },
 *   "receivers": [
 *     "slack"
 *   ],
 *   "fingerprint": "4ad476dfd50e1708"
 * }
 */
interface IAlert {
  labels: { [label: string]: string };
  annotations: IAlertAnnotations;
  startsAt: string; // Date
  endsAt: string; // Date
  generatorURL: string;  // URL
  status: IAlertStatus;
  receivers: string[];
  fingerprint: string;
}

/**
 * Alertmanager alerts response
 * {
 *   "status": "success",
 *   "data": { ... }
 *  }
 */
interface IAlertsResponse extends IResponse {
  data: IAlert[];
}

/**
 * Alertmanager silence alert matcher
 * {
 *   "name": "service",
 *   "value": "web",
 *   "isRegex": false
 * }
 */
interface IAlertMatcher {
  name: string;
  value: string;
  isRegex: boolean;
}

enum SilenceState {
  Active = 'active',
  Expired = 'expired',
  Pending = 'pending',
}

/**
 * Alertmanager silence
 * {
 *   "id": "ab5d06db-bfd4-4fbb-ab03-9a1aee330655",
 *   "matchers": [
 *     {
 *       "name": "service",
 *       "value": "web",
 *       "isRegex": false
 *     }
 *   ],
 *   "startsAt": "2018-03-09T21:37:15.828028096Z",
 *   "endsAt": "2018-03-09T21:41:09.992541229Z",
 *   "updatedAt": "2018-03-09T21:41:09.992542162Z",
 *   "createdBy": "lukassup@yahoo.com",
 *   "comment": "Renewing TLS certificates",
 *   "status": {
 *     "state": "expired"
 *   }
 * }
 */
interface ISilence {
  id: string;  // UUID
  matchers: IAlertMatcher[];
  startsAt: string;  // Date
  endsAt: string;  // Date
  updatedAt: string;  // Date
  createdby: string;
  comment: string;
  status: { state: SilenceState };
}

/**
 * Alertmanager silence response
 */
interface ISilenceResponse extends IResponse {
  data: ISilence;
}

/**
 * Alertmanager silences response
 * {
 *   "status": "success",
 *   "data": { ... }
 *  }
 */
interface ISilencesResponse extends IResponse {
  data: ISilence[];
}

/**
 * Alertmanager receivers response
 */
interface IReceiversResponse extends IResponse {
  data: string[];
}

/**
 * Alertmanager alert group route options
 * {
 *   "receiver": "slack",
 *   "groupBy": [
 *     "alertname",
 *     "instance",
 *     "service"
 *   ],
 *   "groupWait": 10000000000,
 *   "groupInterval": 300000000000,
 *   "repeatInterval": 14400000000000
 * }
 */
interface IAlertGroupRouteOpts {
  receiver: string;
  groupBy: string[];
  groupWait: Number;
  groupInterval: Number;
  repeatInterval: Number;
}

/**
 * Alertmanager alert group block
 * {
 *   "routeOpts": { ... },
 *   "alerts": [ ... ]
 * }
 */
interface IAlertBlock {
  routeOpts: IAlertGroupRouteOpts;
  alerts: IAlert[];
}

/**
 * Alertmanager alert group
 * {
 *   "labels": { ... },
 *   "groupKey": "{}:{alertname=\"high_memory_usage\", instance=\"web001\", service=\"web\"}",
 *   "blocks": [ ... ]
 * }
 */
interface IAlertGroup {
  labels: { [label: string]: string };
  groupKey: string;
  blocks: IAlertBlock[];
}

/**
 * Alertmanager alert groups response
 */
interface IAlertGroupsResponse extends IResponse {
  data: IAlertGroup[];
}

/**
 * Alertmanager silence create response
 * {
 *   "status": "success",
 *   "data": {
 *     "silenceId": "7874dcc9-73a4-4135-a43e-145b465d1531"
 *   }
 * }
 */
interface ISilenceCreateResponse extends IResponse {
  data: { silenceId: string };  // UUID
}
