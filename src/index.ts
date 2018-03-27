import { AlertmanagerClient } from './client';

const ALERTMANAGER_URL = process.env.ALERTMANAGER_URL || 'http://localhost:9093';
const client = new AlertmanagerClient(ALERTMANAGER_URL);

(async () => {

  console.log('Getting Alertmanager status');
  try {
    const response = await client.getStatus();
    const { status, data } = response.data;
    console.log(response.status, status, data.uptime);
  } catch (err) {
    console.error(err.message);
    if (err.response) {
      console.error(err.response.status, err.response.statusText, err.response.data);
    }
  }

  console.log('Getting Alertmanager receivers');
  try {
    const response = await client.getReceivers();
    const { status, data } = response.data;
    console.log(response.status, status, data);
  } catch (err) {
    console.error(err.message);
    if (err.response) {
      console.error(err.response.status, err.response.statusText, err.response.data);
    }
  }

  console.log('Getting Alertmanager alert groups');
  try {
    const response = await client.getAlertGroups();
    const { status, data } = response.data;
    console.log(response.status, status, data);
  } catch (err) {
    console.error(err.message);
    if (err.response) {
      console.error(err.response.status, err.response.statusText, err.response.data);
    }
  }

  console.log('Getting Alertmanager alerts');
  try {
    const response = await client.getAlerts();
    const { status, data } = response.data;
    console.log(response.status, status, data);
  } catch (err) {
    console.error(err.message);
    if (err.response) {
      console.error(err.response.status, err.response.statusText, err.response.data);
    }
  }

  console.log('Creating Alertmanager silence');
  let sid = '';
  try {
    const response = await client.createSilence({
      startsAt: '2018-03-20T00:00:00.000000000Z',
      endsAt: '2018-04-20T23:59:59.999999999Z',
      matchers: [{
        name: 'service',
        value: 'hello',
      }],
    });
    const { status, data } = response.data;
    console.log(response.status, status, data);
    sid = data.silenceId;
  } catch (err) {
    console.error(err.message);
    if (err.response) {
      console.error(err.response.status, err.response.statusText, err.response.data);
    }
  }

  console.log('Getting Alertmanager silences');
  try {
    const response = await client.getSilences();
    const { status, data } = response.data;
    console.log(response.status, status, data);
  } catch (err) {
    console.error(err.message);
    if (err.response) {
      console.error(err.response.status, err.response.statusText, err.response.data);
    }
  }

  console.log('Getting Alertmanager silence');
  try {
    const response = await client.getSilence(sid);
    const { status, data } = response.data;
    console.log(response.status, status, data);
  } catch (err) {
    console.error(err.message);
    if (err.response) {
      console.error(err.response.status, err.response.statusText, err.response.data);
    }
  }

  console.log('Deleting Alertmanager silence');
  try {
    const response = await client.deleteSilence(sid);
    const { status, data } = response.data;
    console.log(response.status, status, data);
  } catch (err) {
    console.error(err.message);
    if (err.response) {
      console.error(err.response.status, err.response.statusText, err.response.data);
    }
  }

})();
