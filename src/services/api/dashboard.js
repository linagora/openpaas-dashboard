const PATH = "/linagora.esn.dashboard/api";

class Dashboard {
  constructor(client) {
    this.client = client;
  }

  list() {
    return this.client.get(`${PATH}/boards`).then(response => response.data);
  }

  create(dashboard) {
    return this.client.put(`${PATH}/boards`, dashboard).then(response => response.data);
  }

  get(dashboardId) {
    return this.client.get(`${PATH}/boards/${dashboardId}`).then(response => response.data);
  }

  delete(dashboardId) {
    return this.client.delete(`${PATH}/boards/${dashboardId}`).then(response => response.data);
  }

  rename(dashboardId, name) {
    return this.client.patch(`${PATH}/boards/${dashboardId}`, { name }).then(response => response.data);
  }

  listWidgets(dashboardId) {
    return this.client.get(`${PATH}/boards/${dashboardId}/widgets`).then(response => response.data);
  }

  reorderWidgets(dashboardId, order) {
    return this.client.patch(`${PATH}/boards/${dashboardId}/widgets/order`, order).then(response => response.data);
  }

  reorderDashboards(order) {
    return this.client.patch(`${PATH}/boards/order`, order).then(response => response.data);
  }

  createWidget(dashboardId, widget) {
    return this.client.put(`${PATH}/boards/${dashboardId}/widgets`, widget).then(response => response.data);
  }

  deleteWidget(dashboardId, widgetId) {
    return this.client.delete(`${PATH}/boards/${dashboardId}/widgets/${widgetId}`).then(response => response.data);
  }

  updateWidgetSettings(dashboardId, widgetId, settings) {
    return this.client
      .post(`${PATH}/boards/${dashboardId}/widgets/${widgetId}/settings`, settings)
      .then(response => response.data);
  }

  updateWidgetColumns(dashboardId, widgetId, columns) {
    return this.client
      .patch(`${PATH}/boards/${dashboardId}/widgets/${widgetId}/settings/columns`, { value: columns })
      .then(response => response.data);
  }

  getSettings() {
    return this.client.get(`${PATH}/settings`).then(response => response.data);
  }
}

export default Dashboard;
