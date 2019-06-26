import axios from "axios";
import Event from "./event";
import ICAL from "ical.js";

export default class CalendarClient {
  constructor(baseUrl, jwtToken, userId) {
    this.baseUrl = baseUrl;
    this.client = this._createClient(baseUrl, jwtToken);
    this.userId = userId;
  }

  _createClient(baseURL, jwtToken) {
    return axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
  }

  getCalendars() {
    return this.client({
      method: "GET",
      url: `/dav/api/calendars/${this.userId}.json`
    }).then(({ data }) => (data._embedded && data._embedded["dav:calendar"]) || []);
  }

  getEvents(path, start, end) {
    return this.client({
      method: "REPORT",
      url: `/dav/api${path}`,
      data: { match: { start, end } }
    }).then(({ data }) => {
      const events = (data._embedded && data._embedded["dav:item"]) || [];

      return events.reduce((shells, icaldata) => {
        const vcalendar = new ICAL.Component(icaldata.data);
        const vevents = vcalendar.getAllSubcomponents("vevent");

        vevents.forEach(vevent =>
          shells.push(new Event(vevent, { path: icaldata._links.self.href, etag: icaldata.etag }))
        );

        return shells;
      }, []);
    });
  }
}
