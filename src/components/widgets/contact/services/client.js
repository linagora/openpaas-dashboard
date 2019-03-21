import axios from "axios";
import Contact from "./contact";
import ICAL from "ical.js";

export default class ContactClient {
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

  searchContacts(bookId, search, limit = 50, page = 1, userId) {
    return this.client({
      method: "GET",
      url: `/dav/api/addressbooks/${bookId}.json`,
      params: {
        search,
        limit,
        page,
        userId
      }
    }).then(({ data }) => {
      const contacts = (data._embedded && data._embedded["dav:item"]) || [];

      return contacts.reduce(function(shells, icaldata) {
        const vcard = new ICAL.Component(icaldata.data);
        const shell = new Contact(vcard);

        shells.push(shell);

        return shells;
      }, []);
    });
  }
}
