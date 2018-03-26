import axios, { AxiosInstance, AxiosResponse } from 'axios';

/**
* Alertmanager REST API client
*
* Golang source code:
*  r.Options("/*path", ihf("options", func(w http.ResponseWriter, r *http.Request) {}))
*
*  // Register actual API.
*  r = r.WithPrefix("/v1")
*
*  r.Get("/status", ihf("status", api.status))
*  r.Get("/receivers", ihf("receivers", api.receivers))
*  r.Get("/alerts/groups", ihf("alert_groups", api.alertGroups))
*
*  r.Get("/alerts", ihf("list_alerts", api.listAlerts))
*  r.Post("/alerts", ihf("add_alerts", api.addAlerts))
*
*  r.Get("/silences", ihf("list_silences", api.listSilences))
*  r.Post("/silences", ihf("add_silence", api.setSilence))
*  r.Get("/silence/:sid", ihf("get_silence", api.getSilence))
*  r.Del("/silence/:sid", ihf("del_silence", api.delSilence))
*/
export class AlertmanagerClient {
  client: AxiosInstance;

  /**
   * @param baseURL Alertmanager instance URL
   */
  constructor(baseURL: string, apiVersion = 'v1') {
    this.client = axios.create({
      baseURL: `${baseURL}/api/${apiVersion}`,
    });
  }

  /**
   * GET /status
   */
  async getStatus(): Promise<AxiosResponse<IStatusResponse>> {
    return await this.client.get<IStatusResponse>('/status');
  }

  /**
   * GET /receivers
   */
  async getReceivers(): Promise<AxiosResponse<IReceiversResponse>> {
    return await this.client.get<IReceiversResponse>('/receivers');
  }

  /**
   * GET /alerts/groups
   */
  async getAlertGroups(): Promise<AxiosResponse<IAlertGroupsResponse>> {
    return await this.client.get<IAlertGroupsResponse>('/alerts/groups');
  }

  /**
   * GET /alerts
   */
  async getAlerts(): Promise<AxiosResponse<IAlertsResponse>> {
    return await this.client.get<IAlertsResponse>('/alerts');
  }

  /**
   * GET /silences
   */  
  async getSilences(): Promise<AxiosResponse<ISilencesResponse>> {
    return await this.client.get<ISilencesResponse>('/silences');
  }

  /**
   * POST /silences
   */
  async createSilence(silence: any): Promise<AxiosResponse<ISilenceCreateResponse>> {
    return await this.client.post<ISilenceCreateResponse>('/silences', silence);
  }

  /**
   * GET /silence/:sid
   * @param sid silence id
   */
  async getSilence(sid: string): Promise<AxiosResponse<ISilenceResponse>> {
    return await this.client.get<ISilenceResponse>(`/silence/${sid}`);
  }

  /**
   * DELETE /silence/:sid
   * @param sid silence id
   */
  async deleteSilence(sid: string): Promise<AxiosResponse> {
    return await this.client.delete(`/silence/${sid}`);
  }
}
