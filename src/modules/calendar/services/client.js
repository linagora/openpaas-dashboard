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

  getEvents(calendarId, start, end) {
    return this.client({
      method: "REPORT",
      url: `/dav/api/calendars/${this.userId}/${calendarId}.json`,
      data: { match: { start, end } }
    }).then(({ data }) => {
      const events = (data._embedded && data._embedded["dav:item"]) || [];

      return events.reduce(function(shells, icaldata) {
        var vcalendar = new ICAL.Component(icaldata.data);
        var vevents = vcalendar.getAllSubcomponents("vevent");

        vevents.forEach(function(vevent) {
          var shell = new Event(vevent, { path: icaldata._links.self.href, etag: icaldata.etag });

          shells.push(shell);
        });

        return shells;
      }, []);
    });
  }
}
