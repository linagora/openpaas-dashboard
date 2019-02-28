import ICAL from "ical.js";
import { isAllDay, isFull24HoursDay, isMultiDay } from "./utils";

export default class Event {
  constructor(vcomponent) {
    var vcalendar, vevent;

    if (vcomponent.name === "vcalendar") {
      vevent = vcomponent.getFirstSubcomponent("vevent");
      vcalendar = vcomponent;
    } else if (vcomponent.name === "vevent") {
      vevent = vcomponent;
      vcalendar = new ICAL.Component("vcalendar");
      vcalendar.addSubcomponent(vevent);
    } else {
      throw new Error(`Cannot create a shell - Unsupported vcomponent ${vcomponent.name}`);
    }

    this.vcalendar = vcalendar;
    this.vevent = vevent;
    this.icalEvent = new ICAL.Event(this.vevent);
    this.uid = this.vevent.getFirstPropertyValue("uid");
    this.summary = this.vevent.getFirstPropertyValue("summary");
    this.status = this.vevent.getFirstPropertyValue("status");
    this.location = this.vevent.getFirstPropertyValue("location");
    this.start = this.icalEvent.startDate.toJSDate();
    this.end = this.icalEvent.endDate.toJSDate();
    this.allDay = isAllDay(this);
    this.isFull24HoursDay = isFull24HoursDay(this);
    this.isMultiDay = isMultiDay(this);
  }
}
