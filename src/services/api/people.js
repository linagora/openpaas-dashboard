export default {
  searchPeople(query) {
    return this.post(`/api/people/search`, query);
  }
};
